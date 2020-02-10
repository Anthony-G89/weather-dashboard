var city = [];


$("#find-city").on("click", function (event) {
    event.preventDefault();
    var searchForCity = $("#search-input").val().trim();
    if (!searchForCity) return;
    $("#search-input").val("");
    renderCity(searchForCity);
    getCityWeather(searchForCity);

    var fiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?&q=" + searchForCity + "&appid=672a1f598eafe184b59f5edbe13124b3&units=imperial";

    $.ajax({
        url: fiveDayForecast,
        method: "GET",
    }).then(function (response) {

        var fiveDays =response.list;
        $(".day1").empty();
         for(var i=0; i < fiveDays.length; i+=8){
            console.log(fiveDays[i]);
            var fiveDaysDiv = $("<div>");
            fiveDaysDiv.addClass("foreCast");
            var days = $("<h3>").text(fiveDays[i].dt_txt);
            var icon = $("<p>").text(fiveDays[i].weather[0].description);
            var fiveDaysTemp = $("<p>").html("<p>Temperature: " + fiveDays[i].main.temp + "</p>");
            var fiveDaysHumidty = $("<p>").html("<p> Humidity: " + fiveDays[i].main.humidity + "%</p>");

             fiveDaysDiv.append(days,icon,fiveDaysTemp,fiveDaysHumidty);
            //  $(".day1").append(days,icon);
            //  $("day1-temp").append(fiveDaysTemp);
            //  $("day1-humidity").append(fiveDaysTemp);
             $(".day1").append(fiveDaysDiv);
             
        };
        fiveDaysFore.style.display ="block";
    });
            // var citySearching = searchForCity.val();
            // localStorage.setItem("cities", JSON.stringify(citySearching));

           
});
    // displayCities();

// function displayCities(){
    // var citySearch = JSON.parse(localStorage.getItem("cities"));

    // searchForCity.val() = citySearch;

    
// }


function renderCity(newcity) {
    city.push(newcity);
    $(".city-results").empty();
    for (var i = 0; i < city.length; i++) {
        var newLi = $("<button>");
        newLi.addClass("list-group-item list-group-item-action city-li");
        newLi.attr("data-city", city[i]);
        newLi.text(city[i]);
        $(".city-results").append(newLi);
    }

}

$(document).on('click', '.city-li', function () {
    var city = $(this).attr('data-city');
    getCityWeather(city);
});


function getCityWeather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + city + "&appid=672a1f598eafe184b59f5edbe13124b3";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $(".temp").html("<p> Temperature: " + response.main.temp + "</p>");
        $(".humidity").html("<p> Humidity: " + response.main.humidity + "%</p>");
        $(".wind-speed").html("<p> Wind Speed: " + response.wind.speed + " MPH</p>");

        var uvApiBase = "https://api.openweathermap.org/data/2.5/uvi?appid=672a1f598eafe184b59f5edbe13124b3";
        uvApiBase += "&lat=" + response.coord.lat;
        uvApiBase += "&lon=" + response.coord.lon;
        $.ajax({
            url: uvApiBase,
            method: "GET",
        }).then(function (uvresponse) {
            $(".uv-index").html("<p> UV Index: " + uvresponse.value + "</p>");
        });
    });
    tempToday.style.display = "block";
}

function renderFiveDayForecast(){
    
    

}
