const app = require('./app.js');

const Lobby = props => {
    return (
        <p>This is a placeholder</p>
    );
};

const Game = props => {
    return (
        <canvas id="canvas"></canvas>
    );
};

const init = async () => {
    ReactDOM.render(<Lobby/>,
        document.getElementById('lobby-container'));

    app.init();
};

window.onload = init;