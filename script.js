var cities = JSON.parse(localStorage.getItem("cities")) || [];
var tempToday1 = $("#tempToday");
var fiveDay1 = $("#fiveDaysFore");
var textOfFiveDayForecast = $("#wordFiveDayForecast");




$("#find-city").on("click", function (event) {
    event.preventDefault();
    var searchForCity = $("#search-input").val().trim();
    if (!searchForCity) return;
    $("#search-input").val("");

    cities.push(searchForCity);
    localStorage.setItem("cities", JSON.stringify(cities));

    renderCity();
    getCityWeather(searchForCity);
    renderFiveDayForecast(searchForCity);

});





function renderCity() {
    $(".city-results").empty();
    for (var i = 0; i < cities.length; i++) {
        var newLi = $("<button>");
        newLi.addClass("list-group-item list-group-item-action city-li");
        newLi.attr("data-city", cities[i]);
        newLi.text(cities[i]);
        $(".city-results").append(newLi);
    }

}

$(document).on('click', '.city-li', function () {
    var city = $(this).attr('data-city');
    getCityWeather(city);
    renderFiveDayForecast(city);

});


function getCityWeather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + city + "&appid=672a1f598eafe184b59f5edbe13124b3";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //console.log(response.weather[0].icon);
        //console.log(weatherIcon);


        var weatherIcon = response.weather[0].icon;
        var iconElem = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
        var todayDate = moment(response.dt * 1000).format('l');
        var locationName = (response.name);
        var iconElem = $("<img>").attr("src", iconElem).attr("alt", "weather icon");

        $(".weatherIcon").html(iconElem);
        $(".locationAndDate").html("<h3>" + locationName + " " + todayDate + "</h3>");
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
    tempToday1.show();
}

function renderFiveDayForecast(city) {

    var fiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?&q=" + city + "&appid=672a1f598eafe184b59f5edbe13124b3&units=imperial";

    $.ajax({
        url: fiveDayForecast,
        method: "GET",
    }).then(function (response) {

        var fiveDays = response.list;
        $("#fiveDaysFore").empty();
    
        for (var i = 0; i < fiveDays.length; i++) {
            if (fiveDays[i].dt_txt.includes("00:00:00")) {
                //console.log(response.list[i].weather[0].icon);
                
               var weatherIconElm = response.list[i].weather[0].icon;
                var wIcon = "http://openweathermap.org/img/w/" + weatherIconElm + ".png";
               
                var fiveDaysDiv = $("<div>").addClass("card d-inline-block fiveDays");
                var cardDiv = $("<div>").addClass("card-body");
                var days = $("<h5>").text(moment(fiveDays[i].dt_txt).format('l'));
                //var icon = $("<p>").text(fiveDays[i].weather[0].description);
                var iconSrc = $("<img>").attr("src", wIcon).attr("alt", "weather icon");
                var fiveDaysTemp = $("<p>").html("<p>Temperature: " + fiveDays[i].main.temp + "°F</p>");
                var fiveDaysHumidty = $("<p>").html("<p> Humidity: " + fiveDays[i].main.humidity + "%</p>");

                cardDiv.append(days, icon, fiveDaysTemp, fiveDaysHumidty,iconSrc);
                fiveDaysDiv.append(cardDiv);

                $("#fiveDaysFore").append(fiveDaysDiv);
            }
        };
        fiveDay1.show();
        textOfFiveDayForecast.show();

    });


}

renderCity();