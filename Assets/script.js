const searchInput = document.querySelector('#search-input')
const searchBtn = document.querySelector('#search-btn')

searchInput.addEventListener('submit', () => {console.log('hello world')})
searchBtn.addEventListener('click', () => {console.log('hello world')})

//  fetch latitude from city search
const weatherKey = '84664db1c48cbb0a713cbe7d4c948b5b';
const city = 'Toronto';
const apiCall = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + weatherKey + '&units=metric';


fetch(apiCall)
    .then(function (response) {
        return response.json()
    })
    .then(function (response) {
       console.log(response);
        let latitude ;
        let longitude;
        





     })
    .catch(function (err) {
         console.error(err)

    });

    

//  
fetch('https://api.openweathermap.org/data/2.5/forecast?lat=43.7001&lon=-79.4163&appid=' + weatherKey)
    .then(function (response) {
        return response.json()
    })
    .then(function (response) {
       console.log(response)

     })
    .catch(function (err) {
         console.error(err)

    });