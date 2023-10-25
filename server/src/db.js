require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize("drivers", DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  logging: false,
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Driver, Image, Team, User, Favorite } = sequelize.models;

Image.belongsTo(Driver, {
  foreignKey: {
    name: "driver",
    allowNull: false,
  },
});

Team.belongsToMany(Driver, {
  through: { model: "DriverTeams", unique: false },
  foreignKey: {
    name: "team",
  },
});

Driver.belongsToMany(Team, {
  through: { model: "DriverTeams", unique: false },
  foreignKey: {
    name: "driver",
  },
});

Favorite.belongsTo(User, {
  foreignKey: {
    name: "user",
    allowNull: false,
  },
});

Favorite.belongsTo(Driver, {
  foreignKey: {
    name: "driver",
    allowNull: false,
  },
});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
