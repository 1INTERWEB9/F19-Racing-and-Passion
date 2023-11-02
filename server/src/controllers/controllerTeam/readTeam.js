const { queryDB } = require("./queryDB");

const readTeam = async ({ condition, id }) => {
  const [results, count] = await queryDB({
    condition,
    id,
  });
  if (results.length < 1) throw new Error("Filtro invalido");
  if (results.length > 1) {
    const information = {
      count: count,
    };
    return { information, data: results };
  } else {
    return results;
  }
};

module.exports = {
  readTeam,
};
