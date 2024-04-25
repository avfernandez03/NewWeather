function refreshWeather(response) {
    let temperatureElement= document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement= document.querySelector("h1");

    cityElement.innerHTML= response.data.city
    temperatureElement.innerHTML=  Math.round(temperature);
}



function searchCity(city) {
    let apiKey= "tee233ebaaa4783bff41331b36o08895";
    let apiUrl= `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearch(event) {
    event.preventDefault();

    let searchInput= document.querySelector("#search-form-input");
 
    cityElement.innerHTML= searchInput.value;
    searchCity(searchInput.value);
}

let searchInputElement = document.querySelector("#search-form");
searchInputElement.addEventListener("submit", handleSearch);

searchCity("San Jose");