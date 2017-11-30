$(document).ready(function() {
  var currentdate = new Date();
  $.simpleWeather({
    location: 'Kiev',
    woeid: '',
    unit: 'f',
    success: function(weather) {

      html = '<span>'+new Date().toLocaleString('uk-UA') + ', ';'</span>';
      html += '<span>'+new Date().toLocaleString('en-US', { hour12: false, 
                                             hour: "numeric",
                                             minute: "numeric"}) + ', ';'</span>';
      html += '<span class="weather"><i class="icon-'+weather.code+'"></i> '+weather.alt.temp+'&deg; ,</span>';
      html += '<span class="weather">'+weather.text+'&deg;</span>';
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
});
