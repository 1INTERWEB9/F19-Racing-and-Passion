const { Op } = require("sequelize");
const axios = require("axios");
const { Driver, Team, Image } = require("../../db");
const { formatApi } = require("./formatApi");
const { formatFiltersAPI, formatFiltersDB } = require("./formatFilters");

const readDriver = async ({ condition, id }) => {
  let filters = {};
  let page = 0;
  let pageSize = 9;
  for (const key in condition) {
    if (key.toLowerCase() != "page" && key.toLowerCase() != "pageSize")
      filters[key] = condition[key];
    else if (key.toLowerCase() == "page") {
      if (condition[key] >= 1) page = condition[key] - 1;
    } else {
      if (condition[key] >= 1) pageSize = condition[key];
    }
  }
  const [resultsApi, countApi, pageApi] = await queryApi({
    filters,
    page,
    pageSize,
    id,
  });
  if (id) {
    if (resultsApi.length > 0) id = "00000000-0000-0000-0000-000000000000";
  }

  const [resultDB, countDB] = await queryDB({
    filters,
    page,
    pageSize,
    pageApi,
    countApi,
    resultsApi,
    id,
  });
  const count = countApi + countDB;
  let results = resultsApi;
  if (resultsApi.length < pageSize) results = resultsApi.concat(resultDB);
  if (results.length < 1) throw new Error("Filtro invalido");
  if (results.length > 1) {
    const information = {
      count: count,
      pages: Math.ceil(count / pageSize),
    };
    return { information, data: results };
  } else {
    return results;
  }
};

const queryApi = async ({ filters, page, pageSize, id }) => {
  const { data } = await axios.get(`http://localhost:5000/drivers`);
  let drivers = [];
  for (const register of data) {
    let driverFormat = await formatApi({ register, Team });
    drivers.push(driverFormat);
  }
  const driversFiltered = formatFiltersAPI({ drivers, filters, id });
  const resultsApi = driversFiltered.slice(
    page * pageSize,
    page * pageSize + pageSize
  );
  const countApi = driversFiltered.length;
  const pageApi = Math.ceil(countApi / pageSize);
  return [resultsApi, countApi, pageApi, drivers];
};

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
  console.log(id);
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
  readDriver,
};
