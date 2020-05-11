const path = require("path"),
    express = require("express"),
    app = express(),
    hbs = require("hbs"),
    geocode = require("./utils/geocode"),
    forecast = require("./utils/forecast"),
    port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set paths
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

// Routes
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Allen",
        error: undefined,
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Allen",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        name: "Allen",
        body: "This is some text.",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address.",
        });
    }

    geocode(req.query.address, (error, { latitude, longitude } = {}) => {
        if (error) {
            return res.send({ error });
        } else {
            forecast(latitude, longitude, (error, { location, current, forecast }) => {
                if (error) {
                    return res.send({ error });
                } else {
                    //parses return data

                    res.send({
                        location: `${location.name}, ${location.region}, ${location.country}`,
                        // observation_time: data.current.observation_time,
                        // temperature: data.current.temperature,
                        // feelslike: data.current.feelslike,
                        // weather_descriptions: data.current.weather_descriptions,
                    });
                }
            });
        }
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        error: "Help article not found.",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "Error404",
        error: "Page not found.",
    });
});

app.listen(port, () => {
    console.log("Server is running!");
});
