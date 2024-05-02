function refreshWeather(response) {
    let temperatureElement= document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement= document.querySelector("h1");
    let descriptionElement= document.querySelector("#description");
    let humidityElement= document.querySelector("#humidity");
    let windElement= document.querySelector("#wind");
    let timeElement = document.querySelector("#time");
    let date= new Date (response.data.time * 1000);
    let iconElement= document.querySelector("#icon");

    getForecast(response.data.city);
  

    cityElement.innerHTML= response.data.city;
    descriptionElement.innerHTML= response.data.condition.description;
    humidityElement.innerHTML= `${response.data.temperature.humidity}%`;
    windElement.innerHTML= `${response.data.wind.speed} km/h `;
    timeElement.innerHTML = formatDate(date);
    iconElement.innerHTML= `<img src="${response.data.condition.icon_url}"class="weather-app-icon">`;
    temperatureElement.innerHTML=  Math.round(temperature);

   
}

function formatDate(date) {
    let hours= date.getHours();
    let minutes= date.getMinutes();
    let days= [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
    ]

    let day= days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    
    return `${day} ${hours}:${minutes}`;
    }
    



function searchCity(city) {
    let apiKey= "tee233ebaaa4783bff41331b36o08895";
    let apiUrl= `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearch(event) {
    event.preventDefault();

    let searchInput= document.querySelector("#search-form-input");
    let cityElement= document.querySelector("h1")
    cityElement.innerHTML= searchInput.value;
    searchCity(searchInput.value);
}

let searchInputElement = document.querySelector("#search-form");
searchInputElement.addEventListener("submit", handleSearch);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun","Mon","Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}


function getForecast(city) {

  let apiKey= "tee233ebaaa4783bff41331b36o08895";
  let apiUrl=  `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);

}


function displayForecast(response) {

    let forecastHtml = "";
  
    response.data.daily.forEach(function (day, index) {
      if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <div>
          <img src="${day.condition.icon_url}"  class="weather-forecast-icon" />
          </div>
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}º</strong>
            </div>
            <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}º</div>
          </div>
        </div>
      `;
      }
    });
  
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
  }



searchCity("San Jose");
displayForecast();
