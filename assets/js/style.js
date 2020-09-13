var searchCities = document.querySelector(".search-button");
var cityList = document.querySelector(".list-cities")


function cityInput(city) {
    
    //create empty array 
    var citiesArray = JSON.parse(localStorage.getItem("cities")) || [];

    if(citiesArray.indexOf(city) === -1) {
        //push city into array
        citiesArray.push(city)

        //set array into localStorage
        localStorage.setItem("cities", JSON.stringify(citiesArray));

        //display city on the screen
        var cityEl = document.createElement("li");
        cityEl.setAttribute("class", "search-history")
        cityEl.innerHTML = city
        
        cityList.appendChild(cityEl)

        var listItems = document.querySelectorAll(".search-history");

        for (var i = 0; i < listItems.length; i++) {
            listItems[i].addEventListener("click", function(){
                var city = event.target.textContent
                console.log(city);
                cityInput(city);
            })
        }
    }//end of if


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
       
        //grab city name, date, icon and display
        var cityName = document.createElement("h2")  
        var date = new Date(currentForcast.dt * 1000)
        cityName.innerHTML = currentForcast.name + " " + "(" + date.toLocaleDateString("en-US") + ")" +
        " " + "<img src='http://openweathermap.org/img/wn/" + currentForcast.weather[0].icon + "@2x.png'>"
        currentDiv.append(cityName);

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
        return fetch("http://api.openweathermap.org/data/2.5/uvi?lat=" + 
        currentForcast.coord.lat + 
        "&lon=" + currentForcast.coord.lon + 
        "&appid=5abd2f3f31f16b1358797c5a21b9e285")
        .then(function(response) {
           return response.json();
         })
        .then(function(response) {
            var uvIndexContainer = document.createElement("div")
            uvIndexContainer.setAttribute("class", "uv-index")
            currentDiv.append(uvIndexContainer)

           var uvIndex = document.createElement("p")
           uvIndex.innerHTML = "UV Index: "
           
           var uvIndexNum = document.createElement("p")
           uvIndexNum.innerHTML = response.value
           
           uvIndexContainer.append(uvIndex)
           uvIndexContainer.append(uvIndexNum)

           if (response.value < 2.01) {
               uvIndexNum.setAttribute("class", "favorable")
           }
           else if (response.value < 7.01) {
               uvIndexNum.setAttribute("class", "moderate")
           }
           else {
               uvIndexNum.setAttribute("class", "severe")
           }
         })
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
        var fiveDayTitleDiv = document.querySelector("#five-day-title")
        fiveDayTitleDiv.removeAttribute("class", "hide")

        //create loop for creating cards for each day
       for (i = 0; i < fiveDayForcast.list.length; i++) {
           if (i === 2 || i === 10 || i === 18 || i === 26 || i === 34 ) {
            var eachDayForcast = document.createElement("div")
            eachDayForcast.setAttribute("class", "card")
            
            //date
            var futureDate = document.createElement("h4")
            var date = new Date(fiveDayForcast.list[i].dt * 1000);
            futureDate.innerHTML = date.toLocaleDateString("en-US") + "<br>" +
            "<img src='http://openweathermap.org/img/wn/" + fiveDayForcast.list[i].weather[0].icon + "@2x.png'>"
            eachDayForcast.appendChild(futureDate)
            

            //temp
            var futureTemp = document.createElement("p")
            futureTemp.innerHTML = "Temp: " + fiveDayForcast.list[i].main.temp + "&deg;F" 
            eachDayForcast.appendChild(futureTemp)       
            
            //humidity
            var futureHumidity = document.createElement("p")
            futureHumidity.innerHTML = "Humidity: " + fiveDayForcast.list[i].main.humidity + "%"
            eachDayForcast.appendChild(futureHumidity)
            
            //append all elements to div
            fiveDayDiv.appendChild(eachDayForcast);
           }
        }
        

    })


    
}


searchCities.addEventListener("click", function() {
    //grab user input
    var city = document.querySelector("#search-bar").value;

    cityInput(city);
});

