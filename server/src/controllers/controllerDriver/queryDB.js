const { Op } = require("sequelize");
const { Driver, Team, Image } = require("../../db");
const { formatFiltersDB } = require("./formatFilters");

const queryDB = async ({
  filters,
  page,
  pageSize,
  pageApi,
  countApi,
  resultsApi,
  id,
}) => {
  let pageDB = page + 1 - pageApi;
  let skipDriver = page * 9 - countApi;
  const [driverFilter, imageFilter, teamsFilter] = formatFiltersDB({ filters });
  if (skipDriver < 1) skipDriver = 0;
  if (pageDB < 1) pageDB = 0;
  let { rows, count } = await Driver.findAndCountAll({
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
      nationality: driverFilter.nationality
        ? driverFilter.nationality
        : { [Op.ne]: null },
      ...(driverFilter.number ? { number: driverFilter.number } : {}),
    },
    offset: skipDriver,
    limit: pageSize - resultsApi.length,
    include: [
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
        attributes: ["id_Team", "nameTeam"],
        where: {
          nameTeam: {
            [Op.iLike]: teamsFilter,
          },
        },
      },
    ],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  if (imageFilter == "%%" || teamsFilter == "%%") {
    count = await Driver.count({
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
        nationality: driverFilter.nationality
          ? driverFilter.nationality
          : { [Op.ne]: null },
        ...(driverFilter.number ? { number: driverFilter.number } : {}),
      },
    });
  }

  const resultsDB = rows;
  const countDB = count;
  return [resultsDB, countDB];
};

module.exports = {
  queryDB,
};
