const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Image = sequelize.define(
    "Image",
    {
      id_image: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      urlImage: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imageBy: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Image;
};
