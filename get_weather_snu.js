      //Load modules
      var request = require('request');

      var key = '77428235b3bf2576ca36a15f9692486f';
      var appId = '&appid=' + key;
      var url = 'http://api.openweathermap.org/data/2.5/weather?lat=37.459814&lon=126.953166';
      var requestURL = url + appId + "&lang=kr";


      request({
          uri: requestURL
        }, function(err, res, body) {
          if (err) {
            context.session.result = err.message;
          } else {
            body = JSON.parse(body);
            var title = "서울대 현재 날씨";
            var summary = body.weather[0].description + " (" + (body.main.temp - 273.15).toFixed(2) + "°C" + ")";
            var humidity = "습도: " + body.main.humidity + "%";
            var wind = "풍속: " + body.wind.speed + "m/s";
            var output_text = title + '\n' + summary + '\n' + humidity + '\n' + wind;
            console.log(output_text);
          }
      });
