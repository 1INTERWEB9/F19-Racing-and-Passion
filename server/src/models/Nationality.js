const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Nationality",
    {
      id_Nationality: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      nameNationality: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
