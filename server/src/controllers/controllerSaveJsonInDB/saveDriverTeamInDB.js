const saveDriverTeamInDB = async ({ jsonInfo, Driver, Team }) => {
  let errors = [];
  for (const register of jsonInfo.drivers) {
    try {
      if (register?.teams) {
        let driverFilter = await Driver.findOne({
          where: { urlDriver: register?.url },
        });
        let teams = register?.teams.replace(/ /g, "").split(",");
        for (let index = 0; index < teams.length; index++) {
          let teamsFilter = await Team.findAll({
            where: {
              nameTeam: teams[index],
            },
          });
          driverFilter.addTeam(teamsFilter);
        }
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
