const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Image = sequelize.define("Image", {
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
  });

  Image.beforeValidate(async (image, options) => {
    if (image.imageBy == "") image.imageBy = "N/A";
    if (image.urlImage == "")
      image.urlImage =
        "https://media.discordapp.net/attachments/1145765718227435656/1166468813689192488/11-racing-512.png?ex=654a99bd&is=653824bd&hm=3c32fff6cbb3a7ee6301dc8dfbc910e682977ad902fff07abd5e5fcd499b4835&=&width=432&height=432";
  });

  return Image;
};
