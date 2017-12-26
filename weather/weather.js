const request = require('request');

var getWeather = (address, callback) => {
  request({
    url: `https://api.darksky.net/forecast/d39372c23999bdfe6bca89a6cefac493/${address.latitude},${address.longitude}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch weather data.');
    }
  }
  );
};

module.exports.getWeather = getWeather;
