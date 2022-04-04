const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const init = () => {
  ctx.save();
  ctx.fillStyle('#000');
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
}

module.exports = {
  init,
}