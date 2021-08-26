const sequelize = require("./db");
const { DataTypes, Model } = require("sequelize");

class Landmark extends Model {}

Landmark.init(
    {
        name: DataTypes.STRING,
        imageUrl: DataTypes.STRING,
    },
    {
        sequelize,
        timestamps: false,
        modelName: "landmark",
    }
);

module.exports = Landmark;
