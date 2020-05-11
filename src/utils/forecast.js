const request = require("request");

const forecast = (latitude, longitude, callback) => {
    //const url = `http://api.weatherstack.com/current?access_key=6a303441084cda0f80b863f16a8bea38&query=${latitude},${longitude}`;
    // Updated to include requests for forecasts
    const url = `http://api.weatherapi.com/v1/forecast.json?key=39f34629db944e34bfd223622201005&q=${latitude},${longitude}&days=3`;

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback("Unable to connect to weather service!", undefined);
        } else if (body.error) {
            callback(body.error.message, undefined);
        } else {
            callback(undefined, body); //returns the body
        }
    });
};

module.exports = forecast;
