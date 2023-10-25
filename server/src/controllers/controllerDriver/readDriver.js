const { Driver, Team, Image } = require("../../db");
const readDriver = async ({ condition }) => {
  let results = await Driver.findAll({
    where: condition,
    include: { model: Image },
  });
  if (results.length < 1) results = await Driver.findAll({});
  return results;
};

module.exports = {
  readDriver,
};
