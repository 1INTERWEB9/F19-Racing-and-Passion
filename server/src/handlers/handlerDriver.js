const { readDriver } = require("../controllers/controllerDriver/readDriver");

const handlerReadDriver = async (request, response) => {
  const id = request.params.id;
  const condition = request.query;
  try {
    const results = await readDriver({ condition, id });
    response.json(results);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  handlerReadDriver,
};
