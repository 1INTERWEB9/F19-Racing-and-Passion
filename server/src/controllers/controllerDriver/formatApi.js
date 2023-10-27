const formatApi = async ({ register, Team }) => {
  const [codeDriver, numberDriver, descriptionDriver] =
    formatCodeNumberDescription({ register });
  let teamsFilter = [];
  if (register?.teams) {
    let teams = register?.teams.replace(/ /g, "").split(",");
    teamsFilter = await formatTeam({ Team, teams });
  }
  const driverFilter = filterDriver({
    register,
    teamsFilter,
    numberDriver,
    codeDriver,
    descriptionDriver,
  });
  return driverFilter;
};

const formatTeam = async ({ Team, teams }) => {
  let teamsFilter = [];
  for (let index = 0; index < teams.length; index++) {
    let { dataValues } = await Team.findOne({
      where: {
        nameTeam: teams[index],
      },
    });
    teamsFilter.push(dataValues);
  }
  return teamsFilter;
};

const formatCodeNumberDescription = ({ register }) => {
  let codeDriver = null;
  let numberDriver = null;
  let descriptionDriver = null;
  if (register?.code != "\\N") codeDriver = register?.code;
  if (Number.isInteger(register?.number)) numberDriver = register?.number;
  if (register?.description?.length > 10 && register?.description)
    descriptionDriver = register?.description;
  return [codeDriver, numberDriver, descriptionDriver];
};

const filterDriver = ({
  register,
  teamsFilter,
  numberDriver,
  codeDriver,
  descriptionDriver,
}) => {
  let driverFilter = {};
  for (const key in register) {
    switch (key) {
      case "teams":
        driverFilter[key] = teamsFilter;
        break;
      case "number":
        driverFilter[key] = numberDriver;
        break;
      case "code":
        driverFilter[key] = codeDriver;
        break;
      case "description":
        driverFilter[key] = descriptionDriver;
        break;
      default:
        driverFilter[key] = register[key];
        break;
    }
  }
  return driverFilter;
};

module.exports = {
  formatApi,
};
