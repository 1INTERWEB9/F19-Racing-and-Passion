const { createDriver } = require("../controllerDriver/createDriver");

const saveDriverInDB = async ({ jsonInfo, Driver }) => {
  let errors = [];
  for (const register of jsonInfo.drivers) {
    try {
      await createDriver({ Driver, register });
    } catch (error) {
      errors.push(error.message);
    }
  }
  if (errors.length >= 1) throw new Error(errors[0]);
};

module.exports = {
  saveDriverInDB,
};
