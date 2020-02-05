
$("#find-city").on("click", function(){
    event.preventDefault();

    var searchForCity = $("#find-city").val();
    var queryURL = "api.openweathermap.org/data/2.5/weather?" + searchForCity + "apid=672a1f598eafe184b59f5edbe13124b3";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }) .then(function(){
        console.log(queryURL);
        
    })
});




    


