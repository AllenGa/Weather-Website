const path = require("path"),
    express = require("express"),
    app = express(),
    hbs = require("hbs"),
    geocode = require("./utils/geocode"),
    forecast = require("./utils/forecast");

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

    geocode(req.query.address, (err, { latitude, longitude } = {}) => {
        if (err) {
            return res.send({ err });
        } else {
            forecast(latitude, longitude, (err, { observation_time, temperature, feelslike, weather_descriptions }) => {
                if (err) {
                    return res.send({ err });
                } else {
                    res.send({
                        observation_time,
                        temperature,
                        feelslike,
                        weather_descriptions,
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

app.listen(3000, () => {
    console.log("Server is running!");
});
