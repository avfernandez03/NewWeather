function refreshWeather(response) {
    let temperatureElement= document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement= document.querySelector("h1");
    let descriptionElement= document.querySelector("#description");
    let humidityElement= document.querySelector("#humidity");
    let windElement= document.querySelector("#wind");
    let timeElement = document.querySelector("#time");
    let date= new Date (response.data.time * 1000);

    cityElement.innerHTML= response.data.city;
    descriptionElement.innerHTML= response.data.condition.description;
    humidityElement.innerHTML= `${response.data.temperature.humidity}%`;
    windElement.innerHTML= `${response.data.wind.speed} km/h `;
    timeElement.innerHTML= formatDate(date);
    temperatureElement.innerHTML=  Math.round(temperature);

   
}

function formatDate(date) {
    let day= days[date.getDay()];
    let hours= date.getHours();
    let minutes= date.getMinutes();
    let days= [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];

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
