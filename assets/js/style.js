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


    //fetch current forcast city info from API
    var currentForcast = fetch("http://api.openweathermap.org/data/2.5/weather?q=" + 
    city + 
    "&appid=5abd2f3f31f16b1358797c5a21b9e285&units=imperial")
    .then(function(currentForcast){
       return currentForcast.json();
       
    })
    .then(function(currentForcast){
        console.log(currentForcast);
        var cityForcastEl = document.querySelector("#city-forcast")
        cityForcastEl.innerHTML='';

        console.log(currentForcast.name)

        //create div for current forcast
        var currentDiv = document.createElement("div");
        currentDiv.setAttribute("class", "current-forcast");

        cityForcastEl.appendChild(currentDiv);

        //grab city name and display
        var cityName = document.createElement("h2")  
        cityName.innerHTML = currentForcast.name
        currentDiv.append(cityName);

        //grab date

        //grab icon

        //grab temperature
        var temp = document.createElement("p")
        temp.innerHTML = "Temperature: " + currentForcast.main.temp + '&deg;F <br>'
        currentDiv.append(temp);
        //grab humidity


        //cityForcastEl.append()
    })

    console.log(currentForcast);

    //fetch 5 day forcast
    //var fiveDayForcast = fetch("http://")

    //display city info on screen (city name, the date, an icon representation 
    //of weather conditions, the temperature, the humidity, the wind speed, and the UV index)
}


searchCities.addEventListener("click", function() {
    cityInput();
});