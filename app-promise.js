const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

  var encodeAddress = encodeURIComponent(argv.address);
  var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}&key=AIzaSyAoxr4KcB9S2CEo_vQilG2Xx5kDlubOzH4`;

  axios.get(geocodeURL).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Address no exist.')
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherURL = `https://api.darksky.net/forecast/d39372c23999bdfe6bca89a6cefac493/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address)

    return axios.get(weatherURL);

  }).then((resp) => {
    var temperature = resp.data.currently.temperature;
    var apparentTemperature = resp.data.currently.apparentTemperature;
    console.log(`Temperature is ${temperature} but feels like ${apparentTemperature}.`);

  }).catch((e) => {
    if (e.code === 'ENOTFOUND') {
      console.log("Can't connect to API.");
    } else {
      console.log(e.message);
    }
  });
