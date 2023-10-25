const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Driver = sequelize.define("Driver", {
    id_Driver: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    referenceDriver: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foreNameDriver: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surNameDriver: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberDriver: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: true,
      },
      valueDefault: null,
    },
    codeDriver: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfBornDriver: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    nationalityDriver: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    urlDriver: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descriptionDriver: {
      type: DataTypes.TEXT(3000),
      allowNull: true,
    },
  });

  Driver.beforeValidate(async (driver, options) => {
    if (!Number.isInteger(driver.numberDriver)) driver.numberDriver = null;
    if (driver.codeDriver == "\\N") driver.codeDriver = null;
    if (driver.descriptionDriver?.length < 10) driver.descriptionDriver = null;
  });

  return Driver;
};
