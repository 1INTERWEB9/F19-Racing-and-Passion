const axios = require("axios");
const { formatApi } = require("./formatApi");
const { Team, Nationality } = require("../../db");
const { formatFiltersAPI } = require("./formatFilters");
const { sortDriver } = require("./sortDrivers");

const queryApi = async ({ filters, id }) => {
  const { data } = await axios.get(`http://localhost:5000/drivers`);
  let drivers = [];
  for (const register of data) {
    let driverFormat = await formatApi({ register, Team, Nationality });
    drivers.push(driverFormat);
  }
  let driversFiltered = formatFiltersAPI({ drivers, filters, id });
  const resultsApi = driversFiltered;
  const countApi = driversFiltered.length;
  return [resultsApi, countApi, drivers];
};

module.exports = {
  queryApi,
};
