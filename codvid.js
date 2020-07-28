// var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://covid-19-data.p.rapidapi.com/report/totals?date-format=YYYY-MM-DD&format=json&date=2020-04-01",
//     "method": "GET",
//     "headers": {
//         "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
//         "x-rapidapi-key": "f437b7a911msh15cc0445209d8f6p177118jsn9c19d310ef25"
//     }
// }

// $.ajax(settings)
//     .then(function (res) {
//         console.log(res[0]);

//         $("#codvid-display");

//         const newcodVidDiv = $("<div>").addClass("codvid-card card");
//         const confimredCase = $("<p>").text("Confirmed cases: " + res[0].confirmed);
//         const recovoredCase = $("<p>").text("Recovored cases: " + res[0].recovered);
//         const deathCase = $("<p>").text("Death Cases: " + res[0].deaths);
//         const activeCase = $("<p>").text("Activate Cases: " + res[0].active);
//         const date = $("<p>").text("Date: " + res[0].date);

//         newcodVidDiv.append(confimredCase, recovoredCase, deathCase, activeCase, date);
//         $("#codvid-display").append(newcodVidDiv);

//     });

