const app = require('./app.js');

app.socket.on('changedLobby', async lobbyJSON => {
    if(!lobbyJSON.error){
        //app.socket.join('Room' + lobbyJSON.raceCode);
        app.setLobby(lobbyJSON);
        renderLobby(lobbyJSON.players, lobbyJSON.raceCode);
    }
    else{
        const Error = props => {
            return (
                <h1>{props.error}</h1>
            );
        }

        ReactDOM.render(<Error error={lobbyJSON.error} />);
    }
});

app.socket.on('startedRace', async () => {
    await ReactDOM.render(<Game/>,
        document.getElementById('game-content'));

    app.init();
});

const createRace = async e => {
    e.preventDefault();
    
    const lobbyInfo = await app.createLobby(e.target.querySelector('#_csrf').value);

    renderLobby(lobbyInfo.players, lobbyInfo.raceCode);
};

const joinRace = async e => {
    e.preventDefault();

    await app.joinLobby(e.target.querySelector('#raceCode').value, e.target.querySelector('#_csrf').value);

    if(!lobbyJSON.error) {
        renderLobby(lobbyJSON.players, lobbyJSON.raceCode);
    }
    else {
        ReactDOM.render(<Error error={lobbyJSON.error} />);
    }
};

const leaveRace = async e => {
    e.preventDefault();

    await app.leaveLobby(e.target.querySelector('#_csrf').value);

    ReactDOM.render(<LobbyCreate csrf={e.target.querySelector('#_csrf').value}/>,
        document.getElementById('game-content'));
};

const startRace = e => {
    e.preventDefault();
    
    app.socket.emit('startedRace');
};

const renderLobby = async (players, raceCode) => {
    const csrfResponse = await fetch('/getToken');
    const csrfData = await csrfResponse.json();

    ReactDOM.render(<Lobby players={players} raceCode={raceCode} csrf={csrfData.csrfToken}/>,
        document.getElementById('game-content'));

    const usernameResponse = await fetch('/getUsername');
    const usernameData = await usernameResponse.json().then(username => username);

    if(!players[usernameData.username].owner) document.getElementById('startButton').type = 'hidden';
};

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
    const players = [];
    for(let key of Object.keys(props.players)){
        players.push(
            <div key={key}>
                <h3>{props.players[key].username}</h3>
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
                <input id='startButton' type='submit' value='Start Race'></input>
            </form>
            <form id='leaveForm'
            name='leaveForm'
            onSubmit={leaveRace}
            action='/leaveRace'
            method='POST'
            >
                <input id='leaveButton' type='submit' value='Leave Lobby'></input>
                <input id='_csrf' type='hidden' name='_csrf' value={props.csrf} />
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