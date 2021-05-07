let ctx;
let mousePressed = false;
let lastX;
let lastY;

initCanvas(document.getElementById('myCanvas'));
document.getElementById('clearButton').addEventListener('click', clearArea);
document.getElementById('completeButton').addEventListener('click', makePattern);

function initCanvas(canvas = document.getElementById('myCanvas')) {
  ctx = canvas.getContext('2d');

  canvas.addEventListener('mousedown', function (event) {
    const rect = this.getBoundingClientRect();
    mousePressed = true;
    draw(event.pageX - rect.left, event.pageY - rect.top, false);
  });

  canvas.addEventListener('mousemove', function (event) {
    if (mousePressed) {
      const rect = this.getBoundingClientRect();
      draw(event.pageX - rect.left, event.pageY - rect.top, true);
    }
  });

  canvas.addEventListener('mouseup', function (event) {
    mousePressed = false;
  });

  canvas.addEventListener('mouseleave', function (event) {
    mousePressed = false;
  });
}

function draw(x, y, isDown) {
  if (isDown) {
    ctx.beginPath();
    ctx.strokeStyle = document.getElementById('selColor').value;
    ctx.lineWidth = document.getElementById('selWidth').value;
    ctx.lineJoin = 'round';
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();
  }

  lastX = x;
  lastY = y;
}

function clearArea() {
  // Use the identity matrix while clearing the canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function makePattern() {
  const resizeImgCanvas = document.createElement('canvas');
  resizeImgCanvas.width = 150;
  resizeImgCanvas.height = 100;

  document.getElementById('myCanvas').toBlob((blob) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.src = url;

    const callback = () => {
      // resize image to 250×200
      const ctx = resizeImgCanvas.getContext('2d');
      ctx.drawImage(img, 0, 0, resizeImgCanvas.width, resizeImgCanvas.height);
      // save image to sessionStorage
      sessionStorage.setItem('patternTile', resizeImgCanvas.toDataURL());
      // navigate to new page
      window.location.href = 'result.html';
    };

    if ('decoding' in img) {
      img.decode().then(callback);
    } else {
      img.onload = callback;
    }
  });
}
