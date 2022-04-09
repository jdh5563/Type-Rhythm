const app = require('./app.js');

const createRace = async e => {
    e.preventDefault();

    const lobbyOwner = await app.createLobby();

    ReactDOM.render(<Lobby players={[lobbyOwner]}/>,
        document.getElementById('game-content'));
};

const startRace = async e => {
    e.preventDefault();

    await ReactDOM.render(<Game/>,
        document.getElementById('game-content'));
    
    app.init();
}

const LobbyCreate = props => {
    return (
        <div>
            <h1>Join a Race!</h1>
            <form id="lobbyForm"
            name="lobbyForm"
            onSubmit={createRace}
            action="/createRace"
            method="POST"
            >
                <div>
                    <input type='submit' value='Create Race'></input>
                </div>
                <div>
                    <input type='text' placeholder='Race Code'></input>
                    <input type='submit' value='Join Race'></input>
                </div>   
            </form>
        </div>
        
    );
};

const Lobby = props => {
    const players = props.players.map(player => {
        return (
            <div key={player}>
                <h3>{player}</h3>
            </div>
        );
    });

    return(
        <div>
            {players}
            <form id='raceForm'
            name='raceForm'
            onSubmit={startRace}
            action='/startRace'
            method='POST'
            >
                <input type='submit' value='Start Race'></input>
            </form>
        </div>
    );
};

const Game = props => {
    return (
        <canvas id="canvas"></canvas>
    );
};

const init = async () => {
    ReactDOM.render(<LobbyCreate/>,
        document.getElementById('game-content'));
};

window.onload = init;