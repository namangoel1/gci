$(function() {

  var days = [
    'Sun',
    'Mon',
    'Tues',
    'Wed',
    'Thur',
    'Fri',
    'Sat'
  ]

  var months = [
    'Jan',
    'Febr',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ]

  var result = {}
  var date;

  $('.submit-zip').on('click', function() {
    
    $('.result').html('<p class="loading">Loading...</p>')

    var pincode = parseFloat($('.zip').val()).toString();

    $.post('/call', { zip: pincode }, function(data, textStatus, xhr) {

      if ( data.success ) {
        $('.result').html('<h2>' + pincode + ', ' + data.city + ', ' + data.state + '</h2>');
        $.each(data.forecasts.Forecast, function(index, forecast) { // Loop through all forecasts
        date = new Date(forecast['Date']);
        result = { // Create are with well-formatted results
          date: days[date.getDay()] + ', ' + date.getDate() + ' ' + months[date.getMonth()],
          desc: forecast.Desciption, // Strange spelling error in output lol
          dayProbRain: forecast.ProbabilityOfPrecipiation.Daytime + '%',
          nightProbRain: forecast.ProbabilityOfPrecipiation.Nighttime + '%',
          tempHigh: forecast.Temperatures.DaytimeHigh + '°F',
          tempLow: forecast.Temperatures.MorningLow + '°F'
        }
        // Create the HTML for the output
        $('.result').append('\
          <section class="forecast">\
            <time class="date">' + result.date + '</time>\
            <div class="desc">' + result.desc + '</div>\
            <div class="rain-prob">\
              <div class="rain-prob__day">' + result.dayProbRain + '</div>\
              <div class="rain-prob__night">' + result.nightProbRain + '</div>\
            </div>\
            <div class="temperature">\
              <div class="temp__high">' + result.tempHigh + '</div>\
              <div class="temp__low">' + result.tempLow + '</div>\
            </div>\
          </section>');
        });
      }
      else {
        $('.result').html('Oops, an error occured. Try a different pincode?');
      }
      
    });
  });
});