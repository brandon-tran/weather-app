const request = require('request');


var geocodeAddress = (address, callback) => {

  var encodeAddress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}&key=AIzaSyAoxr4KcB9S2CEo_vQilG2Xx5kDlubOzH4`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Cannot connect to Google API.');
    } else if (body.status === "ZERO_RESULTS") {
      callback('Cannot find address.');
    } else if (body.status === "OK") {
      var callbackObj = {
        address : body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      };
      callback(undefined, callbackObj);
    }
  })
};

module.exports.geocodeAddress = geocodeAddress;
