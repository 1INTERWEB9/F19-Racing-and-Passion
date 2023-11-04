const { Op } = require("sequelize");
const { Nationality } = require("../../db");

const queryDB = async ({ condition, id }) => {
  let { rows, count } = await Nationality.findAndCountAll({
    where: {
      id_Nationality: id ? id : { [Op.ne]: null },
      nameNationality: {
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
