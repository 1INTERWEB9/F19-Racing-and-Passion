const saveTeamInDB = async ({ jsonInfo, Team }) => {
  let errors = [];
  for (const register of jsonInfo) {
    try {
      if (register?.teams) {
        let teamsFiltered = register?.teams.replace(/ /g, "").split(",");
        for (let index = 0; index < teamsFiltered.length; index++) {
          await Team.findOrCreate({
            where: {
              nameTeam: teamsFiltered[index],
            },
          });
        }
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
