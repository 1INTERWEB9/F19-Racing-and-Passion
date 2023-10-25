const { createImage } = require("../controllerImage/controllerImage");

const saveImageInDB = async ({ jsonInfo, Driver, Image }) => {
  let errors = [];
  for (const register of jsonInfo.drivers) {
    try {
      let driverFilter = await Driver.findOne({
        where: { urlDriver: register?.url },
      });
      await createImage({ Image, register, driverFilter });
    } catch (error) {
      errors.push(error.message);
    }
  }
  if (errors.length >= 1) throw new Error(errors[0]);
};

module.exports = {
  saveImageInDB,
};
