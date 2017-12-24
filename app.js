const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather')
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

//console.log(argv.address);

var location = geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);

    weather.getWeather(results, (errorMessage,wResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`The weather is ${wResults.temperature} degrees, but it feels like it is ${wResults.apparentTemperature} degrees.`)
      }
    });

  }
});






//weather.getWeather(geocode.geocodeAddress());
