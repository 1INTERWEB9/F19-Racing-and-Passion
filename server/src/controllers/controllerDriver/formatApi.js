const formatApi = async ({ register, Team }) => {
  const [codeDriver, numberDriver, descriptionDriver] =
    formatCodeNumberDescription({ register });
  const imageDriver = formatImage({ register });
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
    imageDriver,
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

const formatImage = ({ register }) => {
  let imageBy = "N/A";
  let urlImage =
    "https://media.discordapp.net/attachments/1145765718227435656/1166468813689192488/11-racing-512.png?ex=654a99bd&is=653824bd&hm=3c32fff6cbb3a7ee6301dc8dfbc910e682977ad902fff07abd5e5fcd499b4835&=&width=432&height=432";
  if (register.image.imageby) imageBy = register.image.imageby;
  if (register?.image?.url !== "") urlImage = register?.image?.url;
  return { imageBy: imageBy, urlImage: urlImage };
};

const filterDriver = ({
  register,
  teamsFilter,
  numberDriver,
  codeDriver,
  descriptionDriver,
  imageDriver,
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
      case "image":
        driverFilter[key] = imageDriver;
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
