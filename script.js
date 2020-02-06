var city =[];


$("#find-city").on("click", function(){
    event.preventDefault();
    var searchForCity = $("#search-input").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q="+ searchForCity +"&appid=672a1f598eafe184b59f5edbe13124b3";
    var uvApi = "http://api.openweathermap.org/data/2.5/uvi?appid=672a1f598eafe184b59f5edbe13124b3&lat=&lon=";

    $.ajax({
        url: queryURL, uvApi,
        method: "GET"
    }) .then(function(response){
        console.log(response, uvApi);
        
        

        $(".temp").html("<p> Temperature: " + response.main.temp + "</p>");
        $(".humidity").html("<p> Humidity: " +response.main.humidity + "%</p>");
        $(".wind-speed").html("<p> Wind Speed: " + response.wind.speed + " MPH</p>");
        //$(".uv-index").html("<p> Uv Index:" + response.)\

    })



});

function renderCity(){
    for (var i=0; i < city.length; i++){

        var newDiv = $("<li>");
        newDiv.addclass("list-group-item");
        newDiv.attr("data-city",city[i]);
        newDiv.text(city[i]);
        $(".city-results").append(newDiv);
  
    }




}
 

