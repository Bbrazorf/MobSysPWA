const worker = new Worker('./worker.js');
const canvas = document.querySelector('canvas');
canvas.height = 100;
canvas.width = 100;
const offScreenCanvas = offscreenCanvas = 'OffscreenCanvas' in window ? canvas.transferControlToOffscreen() : canvas;

const cHeight = canvas.height;
const cWidth = canvas.width;
const audio = document.querySelector("audio");
let audioCtx = new (window.webkitAudioContext || window.AudioContext)();

let analyser = audioCtx.createAnalyser();
let source = audioCtx.createMediaElementSource(audio);
source.connect(audioCtx.destination);
source.connect(analyser);

analyser.fftSize = 256;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
const audioData = analyser.getByteTimeDomainData(dataArray);

worker.postMessage({msg: 'init', canvas: offscreenCanvas}, [offscreenCanvas]);

function draw() {
    audioCtx.resume();
    drawVisual = requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

    worker.postMessage({dataArray, bufferLength});
};

draw();