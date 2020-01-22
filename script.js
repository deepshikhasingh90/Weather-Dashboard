var Currentdate=moment().format('DD/MM/YYYY');
console.log(Currentdate);
var cities=[];
var APIKey = "8cb90584fa7ac7921c99490fc6f3d077";



$("#searchCity").on("click",function(event){
    event.preventDefault();
    var city=$("#cityTextBox").val().trim();
    console.log(city);
    displayWeather(city)
})
function displayWeather(city){
    $("#cityName").empty();
    $("#cityTemp").empty();
    $("#cityHumidity").empty();
    $("#cityWindSpeed").empty();     
    $("#cityUvIndex").empty();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=" + APIKey;

    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(response){
        console.log(queryURL)
        console.log(response);
        var temperature = response.main.temp ;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;
        var longitude = response.coord.lon;
        var latitude = response.coord.lat;
        console.log("temperature: "+temperature + " humidity: "+ humidity+ " windspeed: " +windSpeed
        + " lonitude: "+longitude+ " latitude: "+ latitude);

        // API to fetch UV index
        var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + latitude + "&lon=" + longitude;

        $.ajax({
            url:queryURL,
            method:"GET"
        }).then(function(response){
            console.log(queryURL);
            console.log(response);
            var uvIndix=response.value;

            $("#cityName").append(city + "( "+ Currentdate +")");
            $("#cityTemp").append("Temperature:  " +  temperature + "&#176;F");
            $("#cityHumidity").append("Humidity:  " +  humidity + "%");
            $("#cityWindSpeed").append("Wind Speed:  " +  windSpeed +"MPH");
            $("#cityUvIndex").append("UW Index:  " +  uvIndix);
        });
    });
    queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" +city+"&units=imperial&appid=" + APIKey;;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        for(i = 0; i < 5; i++){
            var nextDay=moment().add(1+i,'days').format('DD/MM/YYYY');
            console.log(nextDay)
            var forecastTemp = Math.round(response.list[i].main.temp);
            var forecastHumidity =response.list[i].main.humidity;
            var forecastWeatherIcon = response.list[i].weather[0].icon;
            var cityIconURLForecast = "http://openweathermap.org/img/w/" + forecastWeatherIcon + ".png";

            $(".fivedays").append($("<div>").addClass("col-sm-2 days")
                .append($("<p>").html(nextDay))//Add the day for the forecast
                .append($("<img src=" + cityIconURLForecast + ">")) //add the weather icon
                .append($("<p>").html("Temp: " + forecastTemp + "&#176;F"))//add the temperature
                .append($("<p>").html("Humidity: " + forecastHumidity + "%")))//add the humidity
         };
    })
}
// function renderButtons() {
    