//const app = require('./app.js');

const createRace = e => {
    e.preventDefault();

    ReactDOM.render(<Lobby players={[]}/>,
        document.getElementById('game-content'));
};

const startRace = async e => {
    e.preventDefault();

    await ReactDOM.render(<Game/>,
        document.getElementById('game-content'));

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth * 0.6;
    canvas.height = canvas.clientWidth * 0.69;
    
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
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
    // List of players (props.players)
    // Start button (input type=button)
    const players = props.players.map(player => {
        <div key={player._id}>
            <h3>{player.username}</h3>
        </div>
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