const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const init = () => {
  canvas.width = window.innerWidth * 0.6;
  canvas.height = canvas.clientWidth * 0.69;

  ctx.save();
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);

  canvas.style.display = 'none';
}

module.exports = {
  init,
}