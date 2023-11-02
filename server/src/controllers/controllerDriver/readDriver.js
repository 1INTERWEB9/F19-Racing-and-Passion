const { queryApi } = require("./queryApi");
const { queryDB } = require("./queryDB");

const readDriver = async ({ condition, id }) => {
  let filters = {};
  let page = 0;
  let pageSize = 9;
  for (const key in condition) {
    if (key.toLowerCase() != "page" && key.toLowerCase() != "pagesize")
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
  else if (results.length > 1) {
    const information = {
      count: count,
      pages: Math.ceil(count / pageSize),
    };
    return { information, data: results };
  } else {
    return results[0];
  }
};

module.exports = {
  readDriver,
};
