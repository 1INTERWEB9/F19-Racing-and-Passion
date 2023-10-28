const { Op } = require("sequelize");
const axios = require("axios");
const { Driver, Team, Image, DriverTeams } = require("../../db");
const { formatApi } = require("./formatApi");
const { formatFiltersAPI, formatFiltersDB } = require("./formatFilters");

const readDriver = async ({ condition }) => {
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
  });
  const [resultDB, countDB] = await queryDB({
    filters,
    page,
    pageSize,
    pageApi,
    countApi,
    resultsApi,
  });
  const count = countApi + countDB;
  let results = resultsApi;
  if (resultsApi.length < pageSize) results = resultsApi.concat(resultDB);
  if (results.length < 1) throw new Error("Filtro invalido");
  const information = {
    count: count,
    pages: Math.ceil(count / pageSize),
  };
  return { information, data: results };
};

const queryApi = async ({ filters, page, pageSize }) => {
  const { data } = await axios.get(`http://localhost:5000/drivers`);
  let drivers = [];
  for (const register of data) {
    let driverFormat = await formatApi({ register, Team });
    drivers.push(driverFormat);
  }
  const driversFiltered = formatFiltersAPI({ drivers, filters });
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
}) => {
  let pageDB = page + 1 - pageApi;
  let skipDriver = page * 9 - countApi;
  const [driverFilter, imageFilter, teamsFilter] = formatFiltersDB({ filters });
  if (skipDriver < 1) skipDriver = 0;
  if (pageDB < 1) pageDB = 0;
  let { rows, count } = await Driver.findAndCountAll({
    where: driverFilter,
    offset: skipDriver,
    limit: pageSize - resultsApi.length,
    include: [
      {
        model: Image,
        attributes: ["id_image", "urlImage", "imageBy"],
        where: {
          [Op.or]: [
            {
              urlImage: {
                [Op.iLike]: imageFilter,
              },
            },
            {
              imageBy: {
                [Op.iLike]: imageFilter,
              },
            },
          ],
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
  // let count = await Driver.count({
  //   where: filters,
  // });
  const resultsDB = rows;
  const countDB = count;
  return [resultsDB, countDB];
};

module.exports = {
  readDriver,
};
