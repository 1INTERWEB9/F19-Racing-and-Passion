const {
  readNationality,
} = require("../controllers/controllerNationality/readNationality");

const handlerReadNationality = async (request, response) => {
  const id = request.params.id;
  const condition = request.query;
  try {
    const results = await readNationality({ condition, id });
    response.json(results);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  handlerReadNationality,
};
