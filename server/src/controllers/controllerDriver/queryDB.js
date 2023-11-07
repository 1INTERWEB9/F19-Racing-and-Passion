const { Op } = require("sequelize");
const { Driver, Team, Image, Nationality } = require("../../db");
const { formatFiltersDB } = require("./formatFilters");
const { sortDriver } = require("./sortDrivers");

const queryDB = async ({ filters, id }) => {
  const [driverFilter, imageFilter, teamsFilter] = formatFiltersDB({ filters });
  let { rows, count } = await Driver.findAndCountAll({
    attributes: [
      "id",
      "driverRef",
      "number",
      "code",
      "forename",
      "surname",
      "dob",
      "url",
      "description",
    ],
    where: {
      id: id ? id : { [Op.ne]: null },
      [Op.or]: [
        {
          forename: {
            [Op.iLike]: driverFilter.name,
          },
        },
        {
          surname: {
            [Op.iLike]: driverFilter.name,
          },
        },
      ],
      dob: driverFilter.dob ? driverFilter.dob : { [Op.ne]: null },
      driverRef: driverFilter.driverRef
        ? driverFilter.driverRef
        : { [Op.ne]: null },
      ...(driverFilter.code ? { code: driverFilter.code } : {}),
      ...(driverFilter.number ? { number: driverFilter.number } : {}),
    },
    include: [
      {
        model: Nationality,
      },
      {
        model: Image,
        attributes: ["id_image", "urlImage", "imageBy"],
        where: {
          imageBy: {
            [Op.iLike]: imageFilter,
          },
        },
      },
      {
        model: Team,
        where: {
          nameTeam: {
            [Op.iLike]: teamsFilter,
          },
        },
      },
    ],
  });
  const resultsDB = rows;
  const countDB = rows.length;
  return [resultsDB, countDB];
};

module.exports = {
  queryDB,
};
