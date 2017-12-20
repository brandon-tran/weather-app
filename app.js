const request = require('request');

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=8%20dunreath%20vista%20belmont&key=AIzaSyAoxr4KcB9S2CEo_vQilG2Xx5kDlubOzH4',
  json: true
}, (error, response, body) => {
  console.log(body);
});
