const sequelize = require("./db");
const Landmark = require("./landmark");
const City = require("./city");

async function setupDb() {
    City.hasMany(Landmark);
    Landmark.belongsTo(City);
    await sequelize.sync();
}

module.exports = setupDb;
