const createTeam = async ({ register, Team }) => {
  let teamsFiltered = register?.teams.replace(/ /g, "").split(",");
  for (let index = 0; index < teamsFiltered.length; index++) {
    await Team.findOrCreate({
      where: {
        nameTeam: teamsFiltered[index],
      },
    });
  }
};

const addDriverTeam = async ({ Team, register, Driver }) => {
  let driverFilter = await Driver.findOne({
    where: { url: register?.url },
  });
  let teams = register?.teams;
  if (typeof register?.teams == "string")
    teams = register?.teams.replace(/ /g, "").split(",");
  for (let index = 0; index < teams.length; index++) {
    let teamsFilter = await Team.findOne({
      where: {
        nameTeam: teams[index],
      },
    });
    driverFilter.addTeam(teamsFilter);
  }
};

module.exports = {
  createTeam,
  addDriverTeam,
};
