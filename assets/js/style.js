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
       
        //grab city name, date and display
        var cityName = document.createElement("h2")  
        var date = new Date(currentForcast.dt * 1000)
        cityName.innerHTML = currentForcast.name + " " + date.toLocaleDateString("en-US") +
        " " + "<img src='http://openweathermap.org/img/wn/" + currentForcast.weather[0].icon + "@2x.png'>"
        currentDiv.append(cityName);

    


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

        //UV Index URL
        //return fetch("http://api.openweathermap.org/data/2.5/uvi?lat=" + 
        //currentForcast.coord.lat + 
        //"&lon=" + currentForcast.coord.lon + 
        //"appid=5abd2f3f31f16b1358797c5a21b9e285")
        //.then(function(response) {
         //   return response.json();
         // })
         // .then(function(response) {
         //   var uvIndex = document.createElement("p")
         //   uvIndex.innerHTML = "UV Index: " + response.value
         //   currentDiv.append(uvIndex)
         // })
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
        cityForcastEl.innerHTML='';

        //create div for 5 day forcast
        var fiveDayDiv = document.createElement("div")
        fiveDayDiv.setAttribute("class", "five-day")

        cityForcastEl.appendChild(fiveDayDiv);

        //show title
        var fiveDayTitle = document.createElement("h2")
        fiveDayTitle.innerHTML = "5 Day Forcast:"

        fiveDayDiv.appendChild(fiveDayTitle);

        //create loop for creating cards for each day
       for (i = 0; fiveDayForcast.list[i] < 5 && fiveDayForcast.list[i] != 1; i++) {
           var eachDayForcast = document.createElement("div")
           eachDayForcast.setAttribute("class", "card")
           
           var date = new Date(fiveDayForcast.list[i].dt * 1000);

           eachDayForcast.innerHTML = date.toLocaleDateString("en-US")
                //"<p>Temp: " + fiveDayForcast.list[i].main.temp + "&deg;F<p>"
                //"<p>Humidity: " + fiveDayForcast.main.humidity "<p>" 
       }
       
       fiveDayDiv.appendChild(eachDayForcast);
       console.log(fiveDayForcast.list[i]);


    })

    
}


searchCities.addEventListener("click", function() {
    cityInput();
});