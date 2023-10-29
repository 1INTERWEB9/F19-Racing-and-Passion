const { Op } = require("sequelize");
const { Team } = require("../../db");

const queryDB = async ({ filters, page, pageSize, id }) => {
  let pageDB = page + 1;
  if (pageDB < 1) pageDB = 0;
  let { rows, count } = await Team.findAndCountAll({
    where: {
      id_Team: id ? id : { [Op.ne]: null },
      nameTeam: {
        [Op.iLike]: filters.name,
      },
    },
    offset: page * 9,
    limit: pageSize,
  });
  const results = rows;
  return [results, count];
};

module.exports = {
  queryDB,
};
