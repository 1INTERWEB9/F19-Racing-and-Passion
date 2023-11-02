const { Op } = require("sequelize");
const { Driver, Team, Image, Nationality } = require("../../db");
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
    offset: skipDriver,
    limit: pageSize - resultsApi.length,
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
