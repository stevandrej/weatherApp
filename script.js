const cityInput = document.getElementById('cityInput');
const cityName = document.querySelector('.city');
const temperature = document.querySelector('.weather__temperature');
const weatherDescription = document.querySelector('.weather__description');
const weatherIcons = document.querySelector('#weather-icons');

const sun = document.createElement("img");
sun.setAttribute('src', './img/sun.png');
sun.setAttribute('alt', 'sun');
sun.setAttribute('class', 'sun');

const cloud = document.createElement("img");
cloud.setAttribute('src', './img/cloud.png');
cloud.setAttribute('alt', 'cloud');
cloud.setAttribute('class', 'cloud');

function clearWeatherIcons() {
    weatherIcons.textContent = '';
}

async function getWeather(city) {
    const API_KEY = '24f438d90630d1490c4ffcdd216dcb02';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    return await fetch(url).then(response => response.json());
}

(setWeather = async () => {

    //If input empty, set default city to Skopje
    let city = 'Skopje'
    if (cityInput.value != '') {
        city = cityInput.value;
    }

    const data = await getWeather(city);
    console.log(data);

    if (data.cod == 200) {
        cityName.innerHTML = data.name;

        let degreeSign = document.createElement('span');
        degreeSign.innerHTML = '&#176;';

        temperature.innerHTML = `${Math.round(data.main.temp)}`;
        temperature.appendChild(degreeSign);

        weatherDescription.innerHTML = data.weather[0].description;

        switch (data.weather[0].id) {
            case 800:
                weatherIcons.appendChild(sun);
                break;
            case 801:
                weatherIcons.appendChild(sun);
                weatherIcons.appendChild(cloud);
                break;
            case 802:
                weatherIcons.appendChild(sun);
                weatherIcons.appendChild(cloud);
                break;
            case 803:
                weatherIcons.appendChild(cloud);
                break;
            case 804:
                weatherIcons.appendChild(cloud);
                break;
            default:
                weatherIcons.appendChild(sun);
                weatherIcons.appendChild(cloud);
                break;
        }
    }

    else if (data.cod == 404) {
        cityName.innerHTML = data.message;

        temperature.innerHTML = 'Error braaat'

        weatherDescription.innerHTML = '';
    }

})();

cityInput.addEventListener("keyup", event => {
    event.preventDefault();
    if (event.keyCode === 13) {
        clearWeatherIcons();
        setWeather();
        cityInput.value = '';
    }
})