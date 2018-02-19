// Global variable declarations
const apiKey = "AIzaSyAQTzl_6jrYck6SwSxl8_70WtdBQjyBkao";
const posApiUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=";
const weatherKey = "&APPID=4586efd438c3c7e3eab41e9e1b5bb1bd"
var temperature;
var check = true;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(main);
}

function main(pos) {
  $.ajax({
    type: "GET",
    url: posApiUrl + pos.coords.latitude + "," + pos.coords.longitude + "&key=" + apiKey,
    data: {},
    dataType: "json",
    success: function(data) {
      $("#current-location").html(data.results[0].address_components[3].long_name);
      weatherCall(pos.coords.longitude, pos.coords.latitude);
    }, //end success region name
    error: function(err) {
      console.log("error: " + JSON.stringify(err));
    }

  }); //end ajax

  function weatherCall(lon, lat) {
    $.ajax({
      type: "GET",
      url: weatherApiUrl + lat + "&lon=" + lon + weatherKey,
      data: {},
      dataType: "JSON",
      success: function(data) {
        temperature = parseInt(data.main.temp) - 272;
        $("#current-weather").html(data.weather[0].main +
          "<br><p> Average Temperature of <p id = 'temp'>" + temperature + "°C" + "</p></p></br>");

        if (/cloud/i.test(data.weather[0].description)) {
          $("body").removeClass("bg-light");
          $("body").addClass("cloud");
        }
        if (/sun|clear/i.test(data.weather[0].description)) {
          $("body").removeClass("bg-light");
          $("body").addClass("sun");
          $("#converter-button").removeClass("btn-secondary");
          $("#converter-button").addClass("btn-info");


        }
        if (/rain|drizzle/i.test(data.weather[0].description)) {
          $("body").removeClass("bg-light");
          $("body").addClass("rain");
        }
      }, //end success weather
      error: function(err) {
        console.log("error: " + JSON.stringify(err));
      }
    }); //end ajax
  } //end weatherCall
} //end main

$("#converter-button").on("click", converter);

function converter() {
  if (check) {
    temperature = parseInt((temperature * 9 / 5) + 32);
    check = false;
    $("#temp").html(temperature + "°F");
  } else {
    temperature = parseInt((temperature - 32) * 5 / 9);
    check = true;
    $("#temp").html(temperature + "°C")
  }
}
