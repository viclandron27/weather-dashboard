var searchCities = document.querySelector(".search-button");
var cityList = document.querySelector(".list-cities")

function cityInput() {
    //grab user input
    var city = document.querySelector("#search-bar").value;
    console.log(city);

    //push city to local storage
    localStorage.setItem("cities", JSON.stringify(city));

    //display city on the screen
    var cityEl = document.createElement("li");
    cityEl.setAttribute("class", "search-history")
    cityEl.innerHTML = city
    
    cityList.appendChild(cityEl)


    //fetch city info from API

    //display city info on screen
}


searchCities.addEventListener("click", function() {
    cityInput();
});