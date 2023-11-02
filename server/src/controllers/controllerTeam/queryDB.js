const { Op } = require("sequelize");
const { Team } = require("../../db");

const queryDB = async ({ condition, id }) => {
  let { rows, count } = await Team.findAndCountAll({
    where: {
      id_Team: id ? id : { [Op.ne]: null },
      nameTeam: {
        [Op.iLike]: condition.name ? condition.name : "%%",
      },
    },
  });
  const results = rows;
  return [results, count];
};

module.exports = {
  queryDB,
};
