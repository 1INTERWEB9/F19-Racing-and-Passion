const axios = require("axios");
const { Driver, Team, Image, DriverTeams } = require("../../db");
const { formatApi } = require("./formatApi");

const readDriver = async ({ condition }) => {
  let filters = {};
  let page = 0;
  let pageSize = 9;
  for (const key in condition) {
    if (key != "page" && key != "pageSize") filters[key] = condition[key];
    else if (key == "page") {
      if (condition[key] >= 1) page = condition[key] - 1;
    } else {
      if (condition[key] >= 1) pageSize = condition[key];
    }
  }
  const [results, count] = await queryApi({ filters, page, pageSize });
  if (results.length < 1) throw new Error("Filtro invalido");
  // return queryDB({ filters, page, pageSize });
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
  const driversFiltered = drivers.filter((driverFilter) => {
    let validation = 0;
    for (const key in filters) {
      if (driverFilter[key] == filters[key]) validation++;
    }

    if (validation === Object.keys(filters).length) return driverFilter;
  });
  const results = driversFiltered.slice(
    page * pageSize,
    page * pageSize + pageSize
  );
  const count = driversFiltered.length;
  return [results, count];
};

const queryDB = async ({ filters, page, pageSize }) => {
  let { count, rows } = await Driver.findAndCountAll({
    where: filters,
    offset: page * pageSize,
    limit: pageSize,
    include: [
      {
        model: Image,
        attributes: ["id_image", "urlImage", "imageBy"],
      },
      {
        model: Team,
        attributes: ["id_Team", "nameTeam"],
      },
    ],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  console.log(count);
  return rows;
};

const createInfo = () => {
  // let info={
  //   page:
  // }
};

module.exports = {
  readDriver,
};
