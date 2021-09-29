const setupDb = require("./setupDb");
const City = require("./city");
const Landmark = require("./landmark");
const express = require("express");
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const {
    allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup our templating engine
const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine("handlebars", handlebars);
app.set("view engine", "handlebars");

app.get("/", async (req, res) => {
    const cities = await City.findAll();
    res.render("home", { cities });
});

app.get("/citydetails/:id", async (req, res) => {
    const city = await City.findByPk(req.params.id, {
        include: Landmark,
    });
    if (!city) {
        return res.sendStatus(404);
    }
    res.render("city", { city });
});

app.get("/cities", async (req, res) => {
    const cities = await City.findAll();
    res.json(cities);
});

app.get("/cities/:id", async (req, res) => {
    const city = await City.findByPk(req.params.id, {
        include: Landmark,
    });
    if (!city) {
        return res.sendStatus(404);
    }
    res.json(city);
});

app.post("/cities", async (req, res) => {
    const { name, population } = req.body;
    await City.create({ name, population });
    res.sendStatus(201);
});

app.delete("/cities/:id", async (req, res) => {
    const city = await City.findByPk(req.params.id);
    if (!city) {
        return res.sendStatus(404);
    }
    await city.destroy();
    res.sendStatus(200);
});

app.post("/cities/:id/landmarks", async (req, res) => {
    const city = await City.findByPk(req.params.id);
    if (!city) {
        return res.sendStatus(404);
    }
    const { name, imageUrl } = req.body;
    await city.createLandmark({ name, imageUrl });
    res.sendStatus(201);
});

app.delete("/cities/:cityId/landmarks/:landmarkId", async (req, res) => {
    const landmark = await Landmark.findByPk(req.params.landmarkId);
    if (!landmark || landmark.cityId.toString() !== req.params.cityId) {
        return res.sendStatus(404);
    }
    await landmark.destroy();
    res.sendStatus(200);
});

setupDb();

module.exports = app;
