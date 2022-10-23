// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}


// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-Key': '84664db1c48cbb0a713cbe7d4c948b5b',
// 		'X-Host': 'api.openweathermap.org'
// 	}
// };


//  fetch latitude from city search
const weatherKey = '84664db1c48cbb0a713cbe7d4c948b5b';
const city = 'Toronto';
const apiCall = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + weatherKey + '&units=metric'
fetch(apiCall)
    .then(function (response) {
        return response.json()
    })
    .then(function (response) {
       console.log(response)
     })
    .catch(function (err) {
         console.error(err)

    });