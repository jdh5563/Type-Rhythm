const lobbies = {};

const createLobby = (req, res) => {
  const { username } = req.body;
  const { skin } = req.body;
  const { raceCode } = req.body;

  lobbies[raceCode] = {
    players: {},

    raceCode,

    standing: 0,
  };

  lobbies[raceCode].players[username] = { username, skin, owner: true };

  return res.status(201).json(lobbies[raceCode]);
};

const joinLobby = (req, res) => {
  const { username } = req.body;
  const { skin } = req.body;
  let { raceCode } = req.body;
  raceCode = raceCode.toUpperCase();

  if (!raceCode) {
    return res.status(400).json({ error: 'No code entered!' });
  }
  if (!lobbies[raceCode]) {
    return res.status(400).json({ error: 'No room with that code exists!' });
  }
  if (Object.keys(lobbies[raceCode].players).length === 5) {
    return res.status(400).json({ error: `Lobby ${raceCode} is already full!` });
  }

  lobbies[raceCode].players[username] = { username, skin, owner: false };
  return res.status(201).json(lobbies[raceCode]);
};

const leaveLobby = (req, res) => {
  const { username } = req.body;
  let { raceCode } = req.body;
  raceCode = raceCode.toUpperCase();

  delete lobbies[raceCode].players[username];

  if (Object.keys(lobbies[raceCode].players).length === 0) {
    const emptyLobby = lobbies[raceCode];
    delete lobbies[raceCode];
    return res.status(201).json(emptyLobby);
  }

  return res.status(201).json(lobbies[raceCode]);
};

const getStanding = (req, res) => {
  const { raceCode } = req.body;
  lobbies[raceCode].standing++;

  return res.status(201).json({ standing: lobbies[raceCode].standing });
};

module.exports = {
  createLobby,
  joinLobby,
  leaveLobby,
  getStanding,
};
