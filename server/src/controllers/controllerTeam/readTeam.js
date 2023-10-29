const { queryDB } = require("./queryDB");

const readTeam = async ({ condition, id }) => {
  let filters = {
    name: "%%",
  };
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
  const [results, count] = await queryDB({
    filters,
    page,
    pageSize,
    id,
  });
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

module.exports = {
  readTeam,
};
