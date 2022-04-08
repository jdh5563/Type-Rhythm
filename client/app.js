let canvas;
let ctx;

const init = () => {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth * 0.6;
  canvas.height = canvas.clientWidth * 0.69;

  ctx.save();
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
}

const createLobby = async () => {
  const response = await fetch('/getCar');
  const car = await response.json();

  console.log(car.existingCar.owner);
}

module.exports = {
  init,
  createLobby,
}