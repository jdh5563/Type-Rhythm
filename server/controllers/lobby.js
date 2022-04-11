const lobbies = {};

const createLobby = (req, res) => {
    const username = req.body.username;
    const raceCode = req.body.raceCode;

    lobbies[raceCode] = {
        players: {},

        raceCode
    };

    lobbies[raceCode].players[username] = { username, owner: true };

    return res.status(201).json(lobbies[raceCode]);
};

const joinLobby = (req, res) => {
    const username = req.body.username;
    let raceCode = req.body.raceCode;
    raceCode = raceCode.toUpperCase();

    if(!lobbies[raceCode]){
        return res.status(400).json({error: "No room with that code exists!"});
    }

    lobbies[raceCode].players[username] = { username, owner: false };
    return res.status(201).json(lobbies[raceCode]);
};

module.exports = {
    createLobby,
    joinLobby,
}