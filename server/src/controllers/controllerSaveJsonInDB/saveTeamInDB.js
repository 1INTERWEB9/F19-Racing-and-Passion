const { createTeam } = require("../controllerTeam/controllerTeam");

const saveTeamInDB = async ({ jsonInfo, Team }) => {
  let errors = [];
  for (const register of jsonInfo) {
    try {
      if (register?.teams) {
        await createTeam({ register, Team });
      }
    } catch (error) {
      errors.push(error.message);
    }
  }
  if (errors.length >= 1) throw new Error(errors[0]);
};

module.exports = {
  saveTeamInDB,
};
