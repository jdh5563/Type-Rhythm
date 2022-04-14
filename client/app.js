let lobby;

const setLobby = lobbyJSON => { lobby = lobbyJSON; console.log(lobby); }

//#region SOCKET IO CODE

// Initializes socket.io
// With this, users can now connect/disconnect
const socket = io();

const createLobby = async _csrf => {
  const usernameResponse = await fetch('/getUsername');
  const usernameData = await usernameResponse.json().then(username => username);

  const skinResponse = await fetch('/getCar');
  const skinData = await skinResponse.json().then(skin => skin);

  // https://www.codegrepper.com/code-examples/javascript/select+random+character+from+string+javascript
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let raceCode = '';

  // TODO: Make sure generated code is not a duplicate
  for(let i = 0; i < 4; i++){
    raceCode += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  const lobbyInfo = { username: usernameData.username, skin: skinData.skin, raceCode, _csrf };

  const lobbyResponse = await fetch('/createLobby', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(lobbyInfo),
  });

  lobby = await lobbyResponse.json();
  return lobby;
};

const joinLobby = async (raceCode, _csrf) => {
  const usernameResponse = await fetch('/getUsername');
  const usernameData = await usernameResponse.json().then(username => username);

  const skinResponse = await fetch('/getCar');
  const skinData = await skinResponse.json().then(skin => skin);

  const lobbyInfo = { username: usernameData.username, skin: skinData.skin, raceCode, _csrf };

  const lobbyResponse = await fetch('/joinLobby', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(lobbyInfo),
  });

  lobby = await lobbyResponse.json();

  socket.emit('joinedLobby', lobby, setLobby);
};

//#endregion

//#region CANVAS CODE

let canvas;
let ctx;

const carSkins = [];

const init = () => {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth * 0.6;
  canvas.height = canvas.clientWidth * 0.69;

  ctx.save();
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
  ctx.restore();

  const playerKeys = Object.keys(lobby.players);
  console.log(lobby.players);
  console.log(playerKeys.length);

  for(let i = 0; i < playerKeys.length; i++){
    carSkins.push(new Image());
    carSkins[i].onload = () => {
      ctx.drawImage(carSkins[i], 0, i * canvas.height / playerKeys.length, 50, 50);
    };
    carSkins[i].src = lobby.players[playerKeys[i]].skin;
    console.log(carSkins[i].onload);
  }

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth * 0.6;
    canvas.height = canvas.clientWidth * 0.69;
  });
}

//#endregion

module.exports = {
  init,
  createLobby,
  joinLobby,
  socket,
}