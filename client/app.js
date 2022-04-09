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
  const usernameResponse = await fetch('/getUsername');
  const usernameData = await usernameResponse.json().then(username => username);
  
  return usernameData.username;
}

module.exports = {
  init,
  createLobby,
}