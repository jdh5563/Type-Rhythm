const helper = require('./helper.js');

const handleCar = e => {
    e.preventDefault();

    const skin = e.target.querySelector('[name="skins"]:checked').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    helper.sendCarPost(e.target.action, {skin, _csrf}, loadCarFromServer);

    return false;
};

const CarForm = props => {
    return (
        <form id='carForm'
            onSubmit={handleCar}
            name='carForm'
            action='/car'
            method='POST'
            className='carForm'
        >
            <input id='yellowSkin' type='radio' name='skins' value='/assets/img/cardefault.png'/>
            <label htmlFor='yellowSkin'>Yellow </label>
            <input id='greenSkin' type='radio' name='skins' value='/assets/img/cargreen.png'/>
            <label htmlFor='greenSkin'>Green </label>
            <input id='_csrf' type='hidden' name='_csrf' value={props.csrf} />
            <input className='makeCarSubmit' type='submit' value='Change Skin' />
        </form>
    )
};

const CarImage = props => {
    console.log(props.skin);
    const carImage = 
                <img src={props.skin || '/assets/img/cardefault.png'} alt='player car' className='playerCar' />;

    return (
        <div className='carImage'>
            {carImage}
        </div>
    );
};

const loadCarFromServer = async () => {
    const response = await fetch('/getCar');
    const data = await response.json();

    ReactDOM.render(
        <CarImage skin={data.car[data.car.length - 1].skin} />,
        document.getElementById('carSection')
    );
};

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(
        <CarForm csrf={data.csrfToken} />,
        document.getElementById('makeCar')
    );

    ReactDOM.render(
        <CarImage skin={'/assets/img/cardefault.png'} />,
        document.getElementById('carSection')
    );

    loadCarFromServer();
}

window.onload = init;