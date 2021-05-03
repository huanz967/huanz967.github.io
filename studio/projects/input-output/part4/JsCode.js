var mousePressed = false;
var lastX, lastY;
var ctx;

function InitThis() {
    ctx = document.getElementById('myCanvas').getContext("2d");

    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
    });
	    $('#myCanvas').mouseleave(function (e) {
        mousePressed = false;
    });
}

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = $('#selColor').val();
        ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x; lastY = y;
}

function clearArea() {
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

// Convert canvas to image
document.getElementById('myCanvas').addEventListener("click", function(e) {
    var canvas = document.querySelector('#my-canvas');

    var dataURL = canvas.toDataURL("image/jpeg", 1.0);

    downloadImage(dataURL, 'my-canvas.jpeg');
});

// Save | Download image
function downloadImage() {
  const result = document.createElement("canvas");
  result.id = "result";
  result.width = 3500;
  result.height = 3000;

  const context = result.getContext("2d");
  const pattern = context.createPattern(
    document.getElementById("myCanvas"),
    "repeat"
  );
  context.fillStyle = pattern;
  context.fillRect(0, 0, result.width, result.height);

  result.toBlob((blob) => {
    const file = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = file;
    a.download = "my-pattern.png";
    a.click();

    URL.revokeObjectURL(a.href);
    document.getElementById("root").appendChild(result);
  }, "image/png");

  sessionStorage.setItem("pattern", result.toDataURL());
}
