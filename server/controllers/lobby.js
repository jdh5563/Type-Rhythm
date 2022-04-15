const lobbies = {};

const createLobby = (req, res) => {
  const { username } = req.body;
  const { skin } = req.body;
  const { raceCode } = req.body;

  lobbies[raceCode] = {
    players: {},

    raceCode,
  };

  lobbies[raceCode].players[username] = { username, skin, owner: true };

  return res.status(201).json(lobbies[raceCode]);
};

const joinLobby = (req, res) => {
  const { username } = req.body;
  const { skin } = req.body;
  let { raceCode } = req.body;
  raceCode = raceCode.toUpperCase();

  if (!lobbies[raceCode]) {
    return res.status(400).json({ error: 'No room with that code exists!' });
  }

  lobbies[raceCode].players[username] = { username, skin, owner: false };
  return res.status(201).json(lobbies[raceCode]);
};

const leaveLobby = (req, res) => {
  const { username } = req.body;
  let { raceCode } = req.body;
  raceCode = raceCode.toUpperCase();

  delete lobbies[raceCode].players[username];
  return res.status(201).json(lobbies[raceCode]);
}

module.exports = {
  createLobby,
  joinLobby,
  leaveLobby,
};
