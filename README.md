# Weather-Forecast

This weather dashboard makes calls to the [Open Weather One Call API](https://openweathermap.org/api/one-call-api) to retrieve data and displays the current forecast, and a 5-day forecast. The dashboard will include information about weather conditions, temperature, wind speed, humidity and also the present UV index. 

The call is made to three seperate endpoints:
1) [Current Forecast Data:](https://api.openweathermap.org/data/2.5/weather?q={city}&appid={appid}&units=metric) User input city search
2) [Get UVI Data:](https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={appid}&units=metric) Get longitude and latitude from user input city search
3) [5-Day Forecast Data:](https://api.openweathermap.org/data/2.5/forecast?q={city}&units=metric&appid={appid}) User input city search

User input will be stored in local storage and a search history button will be made. If user clicks on the button of the previously searched city, the dashboard will display the data for the chosen city again. 

## Site Preview
Deployed URL: 
Repository URL: https://github.com/DustinLee0/Weather-Forecast
![image of site](./Assets/images/weatherDashbaord%20Large.jpeg)

## Notes
The UVI data API call is based on a subscription service. Currently, the free subscription offers a limit of 60calls/minute and 1'000'000calls/month. 