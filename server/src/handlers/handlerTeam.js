const { readTeam } = require("../controllers/controllerTeam/readTeam");

const handlerTeam = async (request, response) => {
  const id = request.params.id;
  const condition = request.query;
  try {
    const results = await readTeam({ condition, id });
    response.json(results);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  handlerTeam,
};
