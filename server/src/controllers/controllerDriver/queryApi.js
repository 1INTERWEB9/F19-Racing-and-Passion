const axios = require("axios");
const { formatApi } = require("./formatApi");
const { Team, Nationality } = require("../../db");
const { formatFiltersAPI } = require("./formatFilters");

const queryApi = async ({ filters, page, pageSize, id }) => {
  const { data } = await axios.get(`http://localhost:5000/drivers`);
  let drivers = [];
  for (const register of data) {
    let driverFormat = await formatApi({ register, Team, Nationality });
    drivers.push(driverFormat);
  }
  const driversFiltered = formatFiltersAPI({ drivers, filters, id });
  const resultsApi = driversFiltered.slice(
    page * pageSize,
    page * pageSize + Number.parseInt(pageSize)
  );
  const countApi = driversFiltered.length;
  const pageApi = Math.ceil(countApi / pageSize);
  return [resultsApi, countApi, pageApi, drivers];
};

module.exports = {
  queryApi,
};
