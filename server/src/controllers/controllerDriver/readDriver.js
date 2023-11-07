const { queryApi } = require("./queryApi");
const { queryDB } = require("./queryDB");
const { sortDriver } = require("./sortDrivers");

const readDriver = async ({ condition, id }) => {
  let filters = {};
  let page = 0;
  let pageSize = 9;
  let sort;
  let reverse = false;
  for (const key in condition) {
    if (
      key.toLowerCase() != "page" &&
      key.toLowerCase() != "pagesize" &&
      key.toLowerCase() != "sort" &&
      key.toLowerCase() != "reverse"
    )
      filters[key] = condition[key];
    else if (key.toLowerCase() == "page") {
      if (condition[key] >= 1) page = condition[key] - 1;
    } else if (key.toLowerCase() == "pagesize") {
      if (condition[key] >= 1) pageSize = condition[key];
    } else if (key.toLowerCase() == "sort") {
      if (condition[key] != null) sort = condition[key];
    } else {
      if (condition[key] != null) reverse = condition[key];
    }
  }
  const [resultsApi, countApi] = await queryApi({
    filters,
    id,
  });
  if (id) {
    if (resultsApi.length > 0) id = "00000000-0000-0000-0000-000000000000";
  }

  const [resultDB, countDB] = await queryDB({
    filters,
    id,
  });
  const count = countApi + countDB;
  let results = resultsApi.concat(resultDB);
  sortDriver(sort, results, reverse);
  if (results.length < 1) throw new Error("Filtro invalido");
  results = results.slice(
    page * pageSize,
    page * pageSize + Number.parseInt(pageSize)
  );
  const information = {
    count: count,
    pages: Math.ceil(count / pageSize),
  };
  return { information, data: results };
};

module.exports = {
  readDriver,
};
