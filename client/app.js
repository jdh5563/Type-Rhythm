let lobby;

const setLobby = lobbyJSON => { lobby = lobbyJSON; }

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

  socket.emit('createdLobby', lobby.raceCode);

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

  setLobby(lobby);

  socket.emit('changedLobby', lobby, true);
};

const leaveLobby = async _csrf => {
  const usernameResponse = await fetch('/getUsername');
  const usernameData = await usernameResponse.json().then(username => username);

  const lobbyInfo = { username: usernameData.username, raceCode: lobby.raceCode, _csrf };

  const lobbyResponse = await fetch('/leaveLobby', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(lobbyInfo),
  });

  lobby = await lobbyResponse.json();

  socket.emit('changedLobby', lobby, false);

  lobby = {};
};

//#endregion

//#region CANVAS CODE

let canvas;
let ctx;

let paragraph;

const carSkins = [];

const init = async () => {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth * 0.6;
  canvas.height = canvas.clientWidth * 0.69;

  ctx.save();
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
  ctx.restore();

  const paragraphResponse = await fetch('/generateParagraph');
  const paragraphJSON = await paragraphResponse.json();
  const officialParagraph = paragraphJSON.paragraph;

  ctx.save();
  ctx.font = '16px Arial';
  drawText(ctx, officialParagraph, 10, canvas.height * 0.75, 20, canvas.width - 20);
  ctx.restore();

  const playerKeys = Object.keys(lobby.players);

  for(let i = 0; i < playerKeys.length; i++){
    carSkins.push(new Image());
    carSkins[i].onload = () => {
      ctx.drawImage(carSkins[i], 0, i * canvas.height / playerKeys.length, 50, 50);
    };
    carSkins[i].src = lobby.players[playerKeys[i]].skin;
  }

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth * 0.6;
    canvas.height = canvas.clientWidth * 0.69;

    ctx.save();
    ctx.font = '16px Arial';
    drawText(ctx, officialParagraph, 10, canvas.height * 0.75, 20, canvas.width - 20);
    ctx.restore();

    for(let i = 0; i < playerKeys.length; i++){
      carSkins.push(new Image());
      carSkins[i].onload = () => {
        ctx.drawImage(carSkins[i], 0, i * canvas.height / playerKeys.length, 50, 50);
      };
      carSkins[i].src = lobby.players[playerKeys[i]].skin;
    }
  });
}

//#endregion

// https://stackoverflow.com/questions/5026961/html5-canvas-ctx-filltext-wont-do-line-breaks
const drawText = (ctx, text, x, y, lineHeight, fitWidth) => {
  fitWidth = fitWidth || 0;
  
  if (fitWidth <= 0)
  {
        ctx.fillText( text, x, y );
      return;
  }
  
  for (let idx = 1; idx <= text.length; idx++)
  {
      const str = text.substr(0, idx);
      if (ctx.measureText(str).width > fitWidth)
      {
          ctx.fillText( text.substr(0, idx-1), x, y );
          drawText(ctx, text.substr(idx-1), x, y + lineHeight, lineHeight,  fitWidth);
          return;
      }
  }
  ctx.fillText(text, x, y);
};

module.exports = {
  init,
  createLobby,
  joinLobby,
  leaveLobby,
  setLobby,
  socket,
}