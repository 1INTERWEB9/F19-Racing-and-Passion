const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Team", {
    id_Team: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    nameTeam: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
