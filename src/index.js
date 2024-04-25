
function handleSearch(event) {
    event.preventDefault();

    let searchInput= document.querySelector("#search-form-input");
    let cityElement= document.querySelector("h1");
    cityElement.innerHTML= searchInput.value;
}

let searchInputElement = document.querySelector("#search-form");
searchInputElement.addEventListener("submit", handleSearch);
