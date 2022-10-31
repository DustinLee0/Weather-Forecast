# Weather-Forecast

This weather dashboard makes calls to the [Open Weather One Call API](https://openweathermap.org/api/one-call-api) to retrieve data and displays the current forecast, and a 5-day forecast. The dashboard will include information about weather conditions, temperature, wind speed, humidity and also the present UV index. 

The call is made to three separate endpoints:
1) [Current Forecast Data:](https://api.openweathermap.org/data/2.5/weather?q={city}&appid={appid}&units=metric) User input city search
2) [Get UVI Data:](https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={appid}&units=metric) Get longitude and latitude from user input city search
3) [5-Day Forecast Data:](https://api.openweathermap.org/data/2.5/forecast?q={city}&units=metric&appid={appid}) User input city search

User input will be stored in local storage and a search history button will be made. If user clicks on the button of the previously searched city, the dashboard will display the data for the chosen city again. 

## Site Preview
Deployed URL: https://dustinlee0.github.io/Weather-Forecast/ 
Repository URL: https://github.com/DustinLee0/Weather-Forecast/
![image of site](./Assets/images/weatherDashbaord%20Large.jpeg)

## User Story
AS A traveler  
I WANT to see the weather outlook for multiple cities  
SO THAT I can plan a trip accordingly  

## Acceptance Criteria
GIVEN a weather dashboard with form inputs  
WHEN I search for a city  
THEN I am presented with current and future conditions for that city and that city is added to the search history  
WHEN I view current weather conditions for that city  
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index  
WHEN I view the UV index  
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe  
WHEN I view future weather conditions for that city  
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity  
WHEN I click on a city in the search history  
THEN I am again presented with current and future conditions for that city  

## Notes
The UVI data API call is based on a subscription service. Currently, the free subscription offers a limit of 60calls/minute and 1'000'000calls/month. 