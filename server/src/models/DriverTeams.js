const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("DriverTeams", {
    id_DriverTeams: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  });
};
