const sequelize = require("./db");
const { DataTypes, Model } = require("sequelize");

class City extends Model {}

City.init(
    {
        name: DataTypes.STRING,
        population: DataTypes.INTEGER,
    },
    {
        sequelize,
        timestamps: false,
        modelName: "city",
    }
);

module.exports = City;
