let lobby;

const setLobby = lobbyJSON => { lobby = lobbyJSON; }
const getRaceCode = () => lobby.raceCode;

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

  return lobby;
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
let numWords;
let userInput;

let startTime;
let endTime;

const carSkins = [];

const init = officialParagraph => {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth * 0.6;
  canvas.height = canvas.clientWidth * 0.69;

  ctx.save();
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
  ctx.restore();

  paragraph = officialParagraph;
  numWords = paragraph.split(' ').length;

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

  userInput = document.getElementById('user-input');
  userInput.oninput = e => e.target.value = '';

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

  // Somehow, this is what it took to make a 3,2,1 countdown
  // Perhaps I could have done this smarter
  window.setTimeout(() => {
    window.setTimeout(() => {
      window.setTimeout(() => {
        window.setTimeout(() => {

          const oneMeasurements = ctx.measureText('1');
          ctx.clearRect(canvas.width * 0.5, canvas.height * 0.5 + 10, oneMeasurements.width, (oneMeasurements.fontBoundingBoxAscent + oneMeasurements.fontBoundingBoxDescent) * -1);
          ctx.restore();

          userInput.oninput = handleInput;
          startTime = Date.now();
        }, 1000);

        const twoMeasurements = ctx.measureText('2');
        ctx.clearRect(canvas.width * 0.5, canvas.height * 0.5 + 10, twoMeasurements.width, (twoMeasurements.fontBoundingBoxAscent + twoMeasurements.fontBoundingBoxDescent) * -1);

        drawText(ctx, '1', canvas.width * 0.5, canvas.height * 0.5, 20, canvas.width - 20);
      }, 1000);

      const threeMeasurements = ctx.measureText('3');
      ctx.clearRect(canvas.width * 0.5, canvas.height * 0.5 + 10, threeMeasurements.width, (threeMeasurements.fontBoundingBoxAscent + threeMeasurements.fontBoundingBoxDescent) * -1);

      drawText(ctx, '2', canvas.width * 0.5, canvas.height * 0.5, 20, canvas.width - 20);

    }, 1000);

    ctx.save();
    ctx.font = '72px Arial';
    drawText(ctx, '3', canvas.width * 0.5, canvas.height * 0.5, 20, canvas.width - 20);
  }, 1000);
};

const handleInput = async e => {
  ctx.save();
  ctx.font = '16px Arial';

  let input = e.target.value;
  const inputMeasurement = ctx.measureText(paragraph.substring(0, input.length));
  const inputWidth = inputMeasurement.width;
  ctx.clearRect(0, canvas.height * 0.75 - inputMeasurement.fontBoundingBoxAscent, canvas.width, canvas.height);

  if(paragraph.substring(0, input.length) === input) {
    drawText(ctx, paragraph, 10, canvas.height * 0.75, 20, canvas.width - 20, input.length, inputWidth);

    if(input.length === paragraph.length) {
      endTime = Date.now() - startTime;
      e.target.oninput = e => { return; };

      const csrfResponse = await fetch('/getToken');
      const csrfData = await csrfResponse.json();

      const standingResponse = await fetch('/getStanding', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ raceCode: lobby.raceCode, _csrf: csrfData.csrfToken }),
    });
      const standingJSON = await standingResponse.json();

      // https://bobbyhadz.com/blog/javascript-get-first-digit-of-number
      // This link provided the idea of casting the Number to a String
      const standing = standingJSON.standing + getStandingSuffix(String(standingJSON.standing));

      const wpm = Math.round(numWords / (endTime / 60000));

      const finishText = `You got ${standing} place!
                        You type ${wpm} wpm!`;

      ctx.save();
      ctx.font = '48px Arial';
      drawText(ctx, finishText, canvas.width * 0.15, canvas.height * 0.5, 60, canvas.width - 20);
      ctx.restore();
    }
  }
  else {
    drawText(ctx, paragraph, 10, canvas.height * 0.75, 20, canvas.width - 20, input.length - 1, inputWidth);

    input = input.substring(0, input.length - 1);
    e.target.value = input;
  }

  ctx.restore();
};

// https://stackoverflow.com/questions/5026961/html5-canvas-ctx-filltext-wont-do-line-breaks
const drawText = (ctx, text, x, y, lineHeight, fitWidth, numGreen = 0, offset = 0) => {
  fitWidth = fitWidth || 0;
  
  if (fitWidth <= 0)
  {
        ctx.fillText( text, x, y );
      return;
  }
  for (let idx = 1; idx <= text.length; idx++)
  {
      const str = text.substring(0, idx);
      if (ctx.measureText(str).width > fitWidth)
      {
        if(idx <= numGreen){
          ctx.save();
          ctx.fillStyle = 'green';
          ctx.fillText( text.substring(0, idx), x, y );
          ctx.restore();
          drawText(ctx, text.substring(idx), x, y + lineHeight, lineHeight,  fitWidth, numGreen - idx, offset);
        }
        else{
          ctx.save();
          ctx.fillStyle = 'green';
          ctx.fillText(text.substring(0, numGreen), x, y);
          ctx.restore();

          ctx.fillText(text.substring(numGreen, idx), x + ctx.measureText(text.substring(0, numGreen)).width, y );
          drawText(ctx, text.substring(idx), x, y + lineHeight, lineHeight, fitWidth);
        }

        return;
      }
  }

  if(numGreen > 0){
    ctx.save();
    ctx.fillStyle = 'green';
    ctx.fillText(text.substring(0, numGreen), x, y);
    ctx.restore();
    ctx.fillText(text.substring(numGreen), x + ctx.measureText(text.substring(0, numGreen)).width, y);
  }
  else{
    ctx.fillText(text, x, y);
  }
};

const getStandingSuffix = standing => {
  if(standing[standing.length - 1] === '1') return 'st';
  else if(standing[standing.length - 1] === '2') return 'nd';
  else if(standing[standing.length - 1] === '3') return 'rd';
  else return 'th';
};

//#endregion

module.exports = {
  init,
  createLobby,
  joinLobby,
  leaveLobby,
  getRaceCode,
  setLobby,
  socket,
}