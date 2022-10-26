const apiKey = '84664db1c48cbb0a713cbe7d4c948b5b';
const searchForm = document.querySelector("#search-form");
const listCard = document.querySelector('#saved-list')
const weatherCard = document.querySelector('#weather-card')
const localSave = [];

searchForm.addEventListener('submit', saveInput);

function saveInput(e) {
    e.preventDefault();
    let input = document.querySelector('#search-input');
    let savedInput = input.value;

    //save input string and push to an array to store
    localSave.push(savedInput);
    localStorage.setItem('cityWeather', JSON.stringify(localSave));

    savedCityList(savedInput);
    getCurrentForecast(savedInput);
    // get5DayForecast(savedInput);

}

// creates list item per city in local storage
function savedCityList(city) {
    const listEl = document.createElement('li');
    listEl.innerHTML = city
    listEl.classList.add('btn', 'btn-primary');
    listCard.appendChild(listEl);

    //MAKE IF STATEMENT TO CHECK IF SAME CITY IS ENTERED, IT WOULD NOT MAKE ANOTHER DUPLICATE BUTTON

}

//  FIRST API CALL: fetch current forecast from city search
function getCurrentForecast(input) {
    const apiCall = 'https://api.openweathermap.org/data/2.5/weather?q=' + input + '&appid=' + apiKey + '&units=metric';

    fetch(apiCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            let cityName = response.name;
            let today = new Date().toLocaleDateString();
            let cityIcon = `http://openweathermap.org/img/w/${response.weather[0].icon}.png`;
            let cityTemp = response.main.temp;
            let cityWind = response.wind.speed * 3.6; // in m/s -> convert to km/hr;
            let cityHumidity = response.main.humidity;

            const newDiv = document.createElement('div');
            const newH2 = document.createElement('h2');
            const newIMG = document.createElement('img')
            const newPTemp = document.createElement('p');
            const newPWind = document.createElement('p');
            const newPHumidex = document.createElement('p');

            //  CURRENT FORECAST
            newIMG.src = cityIcon;
            newIMG.classList.add('inline');
            newH2.innerHTML = cityName + ' ' + today + ' ';
            newH2.appendChild(newIMG);
            newDiv.append(newH2);
            //  CURRENT FORECAST: CONTENT
            newPTemp.innerHTML = 'Temperature: ' + cityTemp + ' °C';
            newPWind.innerHTML = 'Wind: ' + cityWind.toFixed(2) + ' km/hr';
            newPHumidex.innerHTML = 'Humidity: ' + cityHumidity + '%';
            newPTemp.classList.add('data-content');
            newPWind.classList.add('data-content');
            newPHumidex.classList.add('data-content');
            newDiv.append(newPTemp, newPWind, newPHumidex);
            newDiv.classList.add('current-forecast');

            weatherCard.append(newDiv);

            oneCallAPI(response.coord.lat, response.coord.lon);
        })
        .catch(function (err) {
            console.error(err);
        });
}

function oneCallAPI(latitude, longitude) {
    let lat = latitude;
    let long = longitude;
    console.log(lat)
    console.log(long)

    fetch('https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + long + '&appid=' + apiKey + '&units=metric')
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response)
            let currentCard = document.querySelector('.current-forecast')
            let uvIndex = response.current.uvi;
            
            const newPUVIndex = document.createElement('p');

            newPUVIndex.innerHTML = 'UV Index: ' + uvIndex;
            newPUVIndex.classList.add('data-content');
            currentCard.append(newPUVIndex);

        })
        .catch(function (err) {
            console.error(err);
        });

}

// SECOND API CALL:  5 day forecast from city search
function get5DayForecast(input) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + input + '&units=metric&appid=' + apiKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            let forecastDate = response.list[3].dt_txt;;
            let forecastIcon = `http://openweathermap.org/img/w/${response.list[3].weather[0].icon}.png`;
            let forecastTemp = response.list[3].main.temp;
            let forecastWind = response.list[1].wind.speed;
            let forecastHumidity = response.list[1].main.humidity;
            console.log(forecastDate);
            // console.log(forecastIcon);
            // console.log(forecastTemp);
            // console.log(forecastWind);
            // console.log(forecastHumidity);
            const newDiv = document.createElement('div');
            const newH3 = document.createElement('h3');
            const newIMG = document.createElement('img');
            const newPTemp = document.createElement('p');
            const newPWind = document.createElement('p');
            const newPHumidex = document.createElement('p');

            newIMG.src = forecastIcon;
            newH3.innerHTML = forecastDate;
            newPTemp.innerHTML = 'Temperature: ' + forecastTemp + ' °C';
            newPWind.innerHTML = 'Wind: ' + forecastWind;
            newPHumidex.innerHTML = 'Humidity: ' + forecastHumidity + '%';
            newPTemp.classList.add('data-content');
            newPWind.classList.add('data-content');
            newPHumidex.classList.add('data-content');
            newDiv.classList.add('forecast-card');
            newDiv.append(newH3, newIMG, newPTemp, newPWind, newPHumidex);

            weatherCard.append(newDiv);



        })
        .catch(function (err) {
            console.error(err);
        });
}


// fetch('https://api.openweathermap.org/data/3.0/onecall?lat=43.7001&lon=-79.4163&appid=cebf833bd004e8474d29b759620ba9d3&units=metric')
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (response) {
//         console.log(response)



//     })
//     .catch(function (err) {
//         console.error(err);
//     });