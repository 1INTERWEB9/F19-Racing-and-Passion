const { createDriver } = require("../controllerDriver/createDriver");

const saveDriverInDB = async ({ jsonInfo, Driver, Nationality }) => {
  let errors = [];
  for (const register of jsonInfo) {
    try {
      await createDriver({ Driver, register, Nationality });
    } catch (error) {
      errors.push(error.message);
    }
  }
  if (errors.length >= 1) throw new Error(errors[0]);
};

module.exports = {
  saveDriverInDB,
};
