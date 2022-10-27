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
    
    clearSearch();
    savedCityList(savedInput);
    getCurrentForecast(savedInput);
    get5DayForecast(savedInput);
}

function clearSearch() {
    while (weatherCard.firstChild) {
        weatherCard.removeChild(weatherCard.children[0])
    }
}

// creates list item per city in local storage
function savedCityList(city) {
    const listEl = document.createElement('li');
    listEl.innerHTML = city
    listEl.classList.add('btn', 'btn-primary');
    listCard.appendChild(listEl);

    const btnList = document.querySelector('#saved-list').children;
    //MAKE IF STATEMENT TO CHECK IF SAME CITY IS ENTERED, IT WOULD NOT MAKE ANOTHER DUPLICATE BUTTON
    console.log(btnList);
    // for (i = 0; i < btnList.length; i++) {
    //     console.log(btnList[i].innerHTML)
    //     if(btnList[i].innerHTML ===  city) {

    //     }
    // }

}

//  FIRST API CALL: fetch current forecast from city search
function getCurrentForecast(input) {
    const apiCall = 'https://api.openweathermap.org/data/2.5/weather?q=' + input + '&appid=' + apiKey + '&units=metric';

    fetch(apiCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
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

// SECOND CALL TO GET UVI DATA FROM ONE CALL API 3.0 ENDPOINT
function oneCallAPI(latitude, longitude) {
    let lat = latitude;
    let long = longitude;

    fetch('https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + long + '&appid=' + apiKey + '&units=metric')
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
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

// THIRD API CALL:  5 day forecast from city search
function get5DayForecast(input) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + input + '&units=metric&appid=' + apiKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            // console.log(response);
            // iterateForecast(response);
            let forecastDate = response.list[3].dt_txt;;
            let forecastIcon = `http://openweathermap.org/img/w/${response.list[3].weather[0].icon}.png`;
            let forecastTemp = response.list[3].main.temp;
            let forecastWind = response.list[3].wind.speed;
            let forecastHumidity = response.list[3].main.humidity;
            let newDate = forecastDate.split(" ");
            let [year, month, day] = newDate[0].split("-");
            const resultDate = [month, day, year].join("/")

            const newDiv = document.createElement('div');
            const newH4 = document.createElement('h4');
            const newH3 = document.createElement('h3');
            const newIMG = document.createElement('img');
            const newPTemp = document.createElement('p');
            const newPWind = document.createElement('p');
            const newPHumidex = document.createElement('p');

            newH3.innerHTML = "5 Day Forecast:"
            newIMG.src = forecastIcon;
            newH4.innerHTML = resultDate;
            newPTemp.innerHTML = 'Temperature: ' + forecastTemp + ' °C';
            newPWind.innerHTML = 'Wind: ' + forecastWind;
            newPHumidex.innerHTML = 'Humidity: ' + forecastHumidity + '%';
            newPTemp.classList.add('data-content');
            newPWind.classList.add('data-content');
            newPHumidex.classList.add('data-content');
            newDiv.classList.add('forecast-card');
            newDiv.append(newH4, newIMG, newPTemp, newPWind, newPHumidex);

            weatherCard.append(newH3);
            weatherCard.append(newDiv);
        })
        .catch(function (err) {
            console.error(err);
        });
}

// function iterateForecast (response) {
//     console.log(response)
//     let day = response.

// }