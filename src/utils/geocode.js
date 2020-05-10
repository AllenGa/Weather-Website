const request = require("request");

const geocode = (address, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address) +
        ".json?access_token=pk.eyJ1IjoibWFwYm94d2F0ZXJsb28iLCJhIjoiY2s5enJqNzdzMDUxMTNnbGx5cGl5NjFsNSJ9.V9cfB2ZiWekakbcSNJFwpg";

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback("Unable to connect to location services!", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search.", undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;
