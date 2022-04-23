const helper = require('./helper.js');

let isPremium;

const handleCar = async e => {
    e.preventDefault();

    if(isPremium) {
        // https://stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value
        const skin = e.target.querySelector('[name="skins"]:checked').value;
        const _csrf = e.target.querySelector('#_csrf').value;

        helper.sendCarPost(e.target.action, {skin, _csrf}, car => {
            ReactDOM.render(
                <CarImage skin={car.skin} />,
                document.getElementById('carSection')
            );
        });
    }

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
            <input id='yellowSkin' type='radio' name='skins' value='/assets/img/cardefault.png' defaultChecked={true}/>
            <label htmlFor='yellowSkin'>Yellow </label>
            <input id='greenSkin' type='radio' name='skins' value='/assets/img/cargreen.png'/>
            <label htmlFor='greenSkin'>Green </label>
            <input id='_csrf' type='hidden' name='_csrf' value={props.csrf} />
            <input className='makeCarSubmit' type='submit' value='Change Skin' />
        </form>
    )
};

const CarImage = props => {
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
        <CarImage skin={data.skin} />,
        document.getElementById('carSection')
    );
};

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    isPremium = await fetch('/premium').then(res => res.json()).then(premium => premium.premium);

    const premiumButton = document.getElementById('premiumButton');

    if(!isPremium) {
        premiumButton.addEventListener('click', async e => {
            e.preventDefault();

            isPremium = await fetch('/premium', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _csrf: data.csrfToken }),
            })
            .then(res => res.json())
            .then(premium => premium.premium);

            e.target.textContent = 'Premium Member!';

            return false;
        });
    }
    else {
        premiumButton.textContent = 'Premium Member!';
    }

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