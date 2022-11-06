const apiKey = '84664db1c48cbb0a713cbe7d4c948b5b';
const searchForm = document.querySelector("#search-form");
const listCard = document.querySelector('#saved-list');
const weatherCard = document.querySelector('#weather-card');
const localSave = [];

searchForm.addEventListener('submit', submitForm);

//  if a search history button is clicked, will call the data with city name on button click and display 
listCard.addEventListener('click', (e) => {
    e.preventDefault();
    let event = e.target;
    clearSearch();
    getCurrentForecast(event.textContent);
    get5DayForecast(event.textContent);
})

function submitForm(e) {
    e.preventDefault();
    clearSearch();
    let search = document.querySelector('#search-input');
    let input = search.value;

    let getSave = JSON.parse(localStorage.getItem('cityWeather'));

    //  if statement for first form submit because there will be no local save to get
    if (getSave === null) {
        getCurrentForecast(input);
        get5DayForecast(input);

        localSave.push(input);
        localStorage.setItem('cityWeather', JSON.stringify(localSave)); 

        const listEl = document.createElement('li');
        listEl.textContent = input;
        listEl.classList.add('btn', 'btn-primary');
        listCard.appendChild(listEl);
        
        search.value = "";
    } else {
        //  checks the local storage array to prevent same city being saved twice
        for (i = 0; i < getSave.length; i++) {
            if (getSave[i] == input) {
                getCurrentForecast(input);
                get5DayForecast(input);
                search.value = "";
                return;
            } 
        }
        localSave.push(input);
        localStorage.setItem('cityWeather', JSON.stringify(localSave));
        
        const listEl = document.createElement('li');
        listEl.textContent = input;
        listEl.classList.add('btn', 'btn-primary');
        listCard.appendChild(listEl);
        
        getCurrentForecast(input);
        get5DayForecast(input);
        search.value = "";
    }
}

function clearSearch() {
    while (weatherCard.firstChild) {
        weatherCard.removeChild(weatherCard.children[0]);
    }
}

//  FIRST API CALL: fetch current forecast from city search
function getCurrentForecast(input) {
    const apiCall = 'https://api.openweathermap.org/data/2.5/weather?q=' + input + '&appid=' + apiKey + '&units=metric';

    fetch(apiCall)
        .then(response => {
            return  response.json()
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

            
            newIMG.src = cityIcon;
            newIMG.classList.add('inline');
            newH2.innerHTML = cityName + ' ' + today + ' ';
            newH2.appendChild(newIMG);
            newDiv.append(newH2);
            
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
        .catch( (err) => {
            console.error(err);
            window.alert('Please enter a valid city.');
            return;
        });
}

// SECOND CALL TO GET UVI DATA FROM ONE CALL API 3.0 ENDPOINT
function oneCallAPI(latitude, longitude) {
    fetch('https://api.openweathermap.org/data/3.0/onecall?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey + '&units=metric')
        .then( (response) => {
            return response.json();
        })
        .then( (response) => {
            let currentCard = document.querySelector('.current-forecast');
            let uvIndex = response.current.uvi;

            const newPUVIndex = document.createElement('p');
            const newSpan = document.createElement('span');

            //  favourable: 1-2; moderate: 3-5; severe:6-7
            if (uvIndex < 3) {
                newSpan.classList.add('favourable');
            } else if (uvIndex > 2 && uvIndex < 6) {
                newSpan.classList.add('moderate');
            } else if (uvIndex > 5) {
                newSpan.classList.add('severe');
            }

            newSpan.innerHTML = uvIndex;
            newPUVIndex.innerHTML = 'UV Index: ';
            newPUVIndex.classList.add('data-content');
            newPUVIndex.appendChild(newSpan);
            currentCard.append(newPUVIndex);
        })
        .catch( (err) => {console.error(err)});
}

// THIRD API CALL:  5 day forecast from city search
function get5DayForecast(input) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + input + '&units=metric&appid=' + apiKey)
        .then( (response) => {
            return response.json();
        })
        .then( (response) => {
            const newH3 = document.createElement('h3');
            newH3.innerHTML = "5 Day Forecast:";
            weatherCard.append(newH3);
            let div = document.createElement('div');
            div.classList.add('row');

            //  response comes back in an array of 40 results because each day is split into 3 hour intervals
            //  iterates over array to find the index where it is 12:00pm at noon then uses data at that index
            for (i = 0; i < response.list.length; i++) {
                let Date = response.list[i].dt_txt;
                let newDate = Date.split(" ");
                if (newDate[1] === '12:00:00') {
                    let forecastIcon = `http://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png`;
                    let forecastTemp = response.list[i].main.temp;
                    let forecastWind = response.list[i].wind.speed * 3.6;
                    let forecastHumidity = response.list[i].main.humidity;
                    let forecastDate = response.list[i].dt_txt;
                    let newDate = forecastDate.split(" ");
                    let [year, month, day] = newDate[0].split("-");
                    const resultDate = [month, day, year].join("/");

                    const newDiv = document.createElement('div');
                    const newH4 = document.createElement('h4');
                    const newIMG = document.createElement('img');
                    const newPTemp = document.createElement('p');
                    const newPWind = document.createElement('p');
                    const newPHumidex = document.createElement('p');

                    newIMG.src = forecastIcon;
                    newH4.innerHTML = resultDate;
                    newPTemp.innerHTML = 'Temperature: ' + forecastTemp + ' °C';
                    newPWind.innerHTML = 'Wind: ' + forecastWind.toFixed(2) + ' km/hr';
                    newPHumidex.innerHTML = 'Humidity: ' + forecastHumidity + '%';
                    newPTemp.classList.add('data-content');
                    newPWind.classList.add('data-content');
                    newPHumidex.classList.add('data-content');
                    newDiv.classList.add('forecast-card');
                    newDiv.append(newH4, newIMG, newPTemp, newPWind, newPHumidex);

                    div.append(newDiv);
                }
                weatherCard.append(div);
            }
        })
        .catch( (err) => {console.error(err)});
}