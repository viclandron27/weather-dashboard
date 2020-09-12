var searchCities = document.querySelector(".search-button");
var cityList = document.querySelector(".list-cities")

function cityInput() {
    //check if user inputted a value or empty string
    
    //grab user input
    var city = document.querySelector("#search-bar").value;
    //console.log(city);

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
        var cityForcastEl = document.querySelector("#current-forcast")
        cityForcastEl.innerHTML='';

        //console.log(currentForcast.name)

        //create div for current forcast
        var currentDiv = document.createElement("div");
        currentDiv.setAttribute("class", "current-city-forcast");

        cityForcastEl.appendChild(currentDiv);

        //display city info on screen (city name, the date, an icon representation 
        //of weather conditions, the temperature, the humidity, the wind speed, and the UV index)
       
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
        var humidity = document.createElement("p")
        humidity.innerHTML = "Humidity: " + currentForcast.main.humidity
        currentDiv.append(humidity)

        //grab wind speed
        var windSpeed = document.createElement("p")
        windSpeed.innerHTML = "Wind Speed: " + currentForcast.wind.speed + " MPH"
        currentDiv.append(windSpeed)

        //uv index
        var uvIndex = document.createElement("p")
        uvIndex.innerHTML = "UV Index: "
        currentDiv.append(uvIndex)



        //cityForcastEl.append()
    })

    //console.log(currentForcast);

    //fetch 5 day forcast
    var fiveDayForcast = fetch("http://api.openweathermap.org/data/2.5/forecast?q=" +
    city + 
    "&appid=5abd2f3f31f16b1358797c5a21b9e285&units=imperial")
    .then(function(fiveDayForcast){
       return fiveDayForcast.json();
    })
     .then(function(fiveDayForcast){
         console.log(fiveDayForcast);
        var cityForcastEl = document.querySelector("#five-day")

        //create div for 5 day forcast
        var fiveDayDiv = document.createElement("div")
        fiveDayDiv.setAttribute("class", "five-day")

        cityForcastEl.appendChild(fiveDayDiv);

        //create loop for creating cards for each day
       // for (i = 0, i)


    })

    
}


searchCities.addEventListener("click", function() {
    cityInput();
});