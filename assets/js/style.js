var searchCities = document.querySelector(".search-button");

function cityInput() {
    var city = document.querySelector("#search-bar").value;
    console.log(city);
}


searchCities.addEventListener("click", function() {
    cityInput();
});