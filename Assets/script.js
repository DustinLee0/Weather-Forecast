const apiKey = '84664db1c48cbb0a713cbe7d4c948b5b';
const searchForm = document.querySelector("#search-form");
const localSave = [];

searchForm.addEventListener('submit', saveInput);

function saveInput(e) {
    e.preventDefault();
    let input = document.querySelector('#search-input');
    let save = input.value

    localSave.push(save)
    localStorage.setItem('cityWeater', JSON.stringify(localSave))

    console.log(input.value);
    getLatLong(input.value);

}

function getLatLong(input) {
    //  fetch latitude from city search
    const city = input;
    const apiCall = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=metric';

    fetch(apiCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
        console.log(response);
            let latitude = response.coord.lat;
            let longitude = response.coord.lon;

            getForecast(latitude, longitude);

            
        })
        .catch(function (err) {
            console.error(err);

        });
}

function getForecast(latitude, longitude) {
    console.log(latitude);
    console.log(longitude);
}
    
// fetch 5 day forecast data
// fetch('https://api.openweathermap.org/data/2.5/forecast?lat=43.7001&lon=-79.4163&appid=' + apiKey)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (response) {
//        console.log(response);

//      })
//     .catch(function (err) {
//          console.error(err);

//     });