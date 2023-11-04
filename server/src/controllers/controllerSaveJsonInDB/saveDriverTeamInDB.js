const { addDriverTeam } = require("../controllerTeam/controllerTeam");

const saveDriverTeamInDB = async ({ jsonInfo, Driver, Team }) => {
  let errors = [];
  for (const register of jsonInfo) {
    try {
      if (register?.teams) {
        await addDriverTeam({ Team, register, Driver });
      }
    } catch (error) {
      errors.push(error.message);
    }
  }
  if (errors.length >= 1) throw new Error(errors[0]);
};

module.exports = {
  saveDriverTeamInDB,
};
