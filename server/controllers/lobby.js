const lobbies = {};

const createLobby = (req, res) => {
    const username = req.body.username;
    const raceCode = req.body.raceCode;

    lobbies[raceCode] = {
        players: {
            username,
        },

        raceCode
    };

    return res.status(201).json(lobbies[raceCode]);
};

const joinLobby = (req, res) => {
    const username = req.body.username;
    const raceCode = req.body.raceCode;

    if(!lobbies[raceCode]){
        return res.status(400).json({error: "No room with that code exists!"});
    }
    console.log(lobbies[raceCode]);
    lobbies[raceCode].players[username] = username;
    console.log(lobbies[raceCode]);
    return res.status(201).json(lobbies[raceCode]);
};

module.exports = {
    createLobby,
    joinLobby,
}