const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=6a303441084cda0f80b863f16a8bea38&query=${latitude},${longitude}`;
    request(
        {
            url,
            json: true,
        },
        (err, { body }) => {
            if (err) {
                callback("Unable to connect to weather service!");
            } else if ((body.error, undefined)) {
                callback(body.error.info, undefined);
            } else {
                callback(undefined, body);
            }
        }
    );
};

module.exports = forecast;
