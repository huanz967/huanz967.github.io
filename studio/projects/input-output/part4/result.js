(function loadPattern() {
  if (!sessionStorage.getItem('patternTile')) {
    window.location.href = '/';
    return;
  }

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const tile = new Image();
  tile.src = sessionStorage.getItem('patternTile');

  const init = () => {
    document.getElementById('resetButton').addEventListener('click', () => {
      clearArea();
      makePattern();
    });

    document.getElementById('randomizeButton').addEventListener('click', () => {
      clearArea();
      fillRandom();
    });

    document.getElementById('colorPicker').addEventListener('input', changeBgColor);

    makePattern();
  };

  if ('decoding' in tile) {
    tile.decode().then(init);
  } else {
    tile.onload = init;
  }

  function makePattern() {
    const pattern = ctx.createPattern(
      tile,
      'repeat'
    );
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  function fillRandom() {
    for (let i = 0; i <= 36; i++) {
      ctx.drawImage(tile, Math.random() * (ctx.canvas.width - tile.width), Math.random() * (ctx.canvas.height - tile.height));
    }
  }

  function changeBgColor(event) {
    canvas.style.backgroundColor = event.target.value;
  }

  function clearArea() {
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
})();
 
