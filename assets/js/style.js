var searchCities = document.querySelector(".search-button");
var cityList = document.querySelector(".list-cities")

function cityInput() {
    //check if user inputted a value or empty string
    
    //grab user input
    var city = document.querySelector("#search-bar").value;
    console.log(city);

    //push city to local storage as array
    localStorage.setItem("cities", JSON.stringify(city));

    //display city on the screen
    var cityEl = document.createElement("li");
    cityEl.setAttribute("class", "search-history")
    cityEl.innerHTML = city
    
    cityList.appendChild(cityEl)


    //fetch city info from API
    fetch("api.openweathermap.org/data/2.5/weather?q=" + 
    city + 
    "&api_key=5abd2f3f31f16b1358797c5a21b9e285");

    //display city info on screen
}


searchCities.addEventListener("click", function() {
    cityInput();
});