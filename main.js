const dotenv = require('dotenv');
const $ = require('./jquery.min.js');

// - User Geo From Weather
let userLat, userLong;

const showPosition = position => {
  userLat = position.coords.latitude;
  userLong = position.coords.longitude;
  //   console.log(userLat)

  // ! I deleted the rest of my JQuery to minimizing unfamiliarity and scariness. What you see below is just a function ( we will learn later ) and uses and old tool that we had to use for our javascript ( we will learn later ) to work on all browser. Think of it sort of like a CSS media query ( we learn this week ) but for a different language
  // - JQuery Weather Handling
  $(function() {
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLong}&units=imperial&appid=${process.env.WEATHER_API_KEY}`,
      success: res => {
        // SVG controllers
        $('#weather__spinner, #weather__spinner > *').hide();
        // Icon
        const url = `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
        $('#jumbo__image')
          .attr('src', `${url}`)
          .addClass('show');
        // Weather Type
        $('#main__jumbo h3').html(res.weather[0].description);
        // Geo Location
        $('#main__jumbo h2').html(res.name);
        // Temp
        $('#weatherStats__temp').html(`${res.main.temp}ºF`);
        // Wind
        $('#weatherStats__wind').html(`${res.wind.speed} / mph`);
        // Min
        $('#other-min h5').html(`${res.main.temp_min}ºF`);
        // Max
        $('#other-max h5').html(`${res.main.temp_max}ºF`);
        // Humidity
        $('#other-humidity h5').html(`${res.main.humidity}%`);
        // Pressure
        $('#other-pressure h5').html(`${res.main.pressure}"Hg`);
        // Lat
        $('#other-geo-lat h5').html(`${Math.round(100 * userLat) / 100}º`);
        // long
        $('#other-geo-long h5').html(`${Math.round(100 * userLong) / 100}º`);
      }
    });
  });
};

(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    $('#main__jumbo h3').html(
      'Geolocation is not available on you device, sorry...'
    );
  }
  // - Hamburger Animations
  $('.fa-bars').click(() => {
    $('header ul').toggleClass('active');
  });
})();
