// // Initializes socket.io
// // With this, users can now connect/disconnect
// const socket = io();

// socket.on('joinedLobby', lobbyInfo => {
//   const lobbyJSON = sendLobbyPost(lobbyInfo);
// });

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

const createLobby = async _csrf => {
  const usernameResponse = await fetch('/getUsername');
  const usernameData = await usernameResponse.json().then(username => username);

  // https://www.codegrepper.com/code-examples/javascript/select+random+character+from+string+javascript
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let raceCode = '';

  // TODO: Make sure generated code is not a duplicate
  for(let i = 0; i < 4; i++){
    raceCode += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  const lobbyInfo = { username: usernameData.username, raceCode, _csrf };

  console.log(lobbyInfo);

  const lobbyResponse = await fetch('/createLobby', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(lobbyInfo),
  });

  const lobbyJSON = await lobbyResponse.json();

  return lobbyJSON;
};

// const joinLobby = async (raceCode, _csrf, render) => {
//   const usernameResponse = await fetch('/getUsername');
//   const usernameData = await usernameResponse.json().then(username => username);

//   const lobbyInfo = { username: usernameData.username, raceCode, _csrf };

//   // const lobbyJSON = sendLobbyPost(lobbyInfo);

//   console.log('about to emit');
//   socket.emit('joinedLobby', lobbyInfo);

//   //return lobbyJSON;
// };

// const sendLobbyPost = async lobbyInfo => {
//   const lobbyResponse = await fetch('/joinLobby', {
//     method: 'POST',
//     headers: {
//     'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(lobbyInfo),
//   });

//   const lobbyJSON = await lobbyResponse.json();

//   return lobbyJSON;
// };

module.exports = {
  init,
  createLobby,
  // joinLobby,
}