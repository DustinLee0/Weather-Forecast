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
    getLatLong(input.value);

}

// creates list item per city in local storage
function savedCityList(city) {
    const listEl = document.createElement('li');
    listEl.innerHTML = city
    listEl.classList.add('btn', 'btn-primary');
    listCard.appendChild(listEl);
}

//  FIRST API CALL: fetch coordinates from city search
function getLatLong(input) {
    const city = input;
    const apiCall = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=metric';

    fetch(apiCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            let cityName = response.name;
            let cityIcon = `http://openweathermap.org/img/w/${response.weather[0].icon}.png`
            let cityTemp = response.main.temp;
            let cityWind = response.wind.speed * 3.6; // in m/s -> convert to km/hr
            let cityHumidity = response.main.humidity;
            let today = new Date().toLocaleDateString();
            const newDiv = document.createElement('div');
            const newH2 = document.createElement('h2');
            const newIMG = document.createElement('img')
            const newPTemp = document.createElement('p');
            const newPWind = document.createElement('p');
            const newPHumidex = document.createElement('p');

            //  CURRENT FORECAST
            newIMG.src = cityIcon ;
            newIMG.classList.add('inline');
            newH2.innerHTML = cityName + ' ' + today;
            newH2.appendChild(newIMG);
            newDiv.append(newH2);            
            //  CURRENT FORECAST: CONTENT
            newPTemp.innerHTML = 'Temperature: ' + cityTemp + ' °C';
            newPWind.innerHTML = 'Wind: ' + cityWind.toFixed(2) + ' km/s';
            newPHumidex.innerHTML = 'Humidity: ' + cityHumidity + '%';
            newPTemp.classList.add('data-content')
            newPWind.classList.add('data-content')
            newPHumidex.classList.add('data-content')
            newDiv.append(newPTemp, newPWind, newPHumidex);
            newDiv.classList.add('current-forecast')
            
            weatherCard.append(newDiv)
            
            
            // let latitude = response.coord.lat;
            // let longitude = response.coord.lon;
            // getForecast(latitude, longitude);
            
        })
        .catch(function (err) {
            console.error(err);

        });
}

// SECOND API CALL:  5 day forecast data (SEARCH BY LONGITUDE AND LATITUDE)
function getForecast(latitude, longitude) {
    console.log(latitude);
    console.log(longitude);

    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey)
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
       console.log(response);

     })
    .catch(function (err) {
         console.error(err);

    });
}


// 5 DAY FORECAST BY SEARCHING BY CITY
// fetch('https://api.openweathermap.org/data/2.5/forecast?q=washington&appid=' + apiKey)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (response) {
//        console.log(response);

//      })
//     .catch(function (err) {
//          console.error(err);

//     });