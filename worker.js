let offCanvas;
let offContext;
let width;
let height;

self.onmessage = function(e) {
  if(e.data.msg === 'init') { 
    offCanvas = e.data.canvas;
    offContext = offCanvas.getContext('2d');
    width = offCanvas.width;
    height = offCanvas.height;
  }else{
    const dataArray = e.data.dataArray;
    const bufferLength = e.data.bufferLength;
    
    offContext.clearRect(0, 0, width, height);
    offContext.fillStyle = 'rgb(0, 0, 0)';
    offContext.fillRect(0, 0, width, height);

    var barWidth = (width / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i]/2;

        offContext.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
        offContext.fillRect(x,height-barHeight/2,barWidth,barHeight);

        x += barWidth + 1;
    }
  }
};

self.postMessage({
    topic: 'done'
});