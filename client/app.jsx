const app = require('./app.js');

const createRace = async e => {
    e.preventDefault();
    
    const lobbyInfo = await app.createLobby(e.target.querySelector('#_csrf').value);

    ReactDOM.render(<Lobby players={lobbyInfo.players} raceCode={lobbyInfo.raceCode}/>,
        document.getElementById('game-content'));
};

const joinRace = async e => {
    e.preventDefault();

    const lobbyInfo = await app.joinLobby(e.target.querySelector('#raceCode').value, e.target.querySelector('#_csrf').value);

    if(!lobbyInfo.error){
        ReactDOM.render(<Lobby players={lobbyInfo.players} raceCode={lobbyInfo.raceCode}/>,
            document.getElementById('game-content'));
    }
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
            <form id="createForm"
            name="createForm"
            onSubmit={createRace}
            action="/createRace"
            method="POST"
            >
                <div>
                    <input type='submit' value='Create Race'></input>
                </div>
                <input id='_csrf' type='hidden' name='_csrf' value={props.csrf} />
            </form>
            <form id='joinForm'
            name="joinForm"
            onSubmit={joinRace}
            action="/joinRace"
            method="POST"
            >
                <div>
                    <input id='raceCode' type='text' placeholder='Race Code'></input>
                    <input type='submit' value='Join Race'></input>
                </div>   
                <input id='_csrf' type='hidden' name='_csrf' value={props.csrf} />
            </form>
        </div>
        
    );
};

const Lobby = props => {
    console.log(props.players);
    const players = [];
    for(let key of Object.keys(props.players)){
        players.push(
            <div key={key}>
                <h3>{props.players[key]}</h3>
            </div>
        );
    }

    return(
        <div>
            {players}
            <div>Race Code: {props.raceCode}</div>
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
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(<LobbyCreate csrf={data.csrfToken}/>,
        document.getElementById('game-content'));
};

window.onload = init;