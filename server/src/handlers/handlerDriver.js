const { Driver, Image, Team, Nationality } = require("../db");
const { readDriver } = require("../controllers/controllerDriver/readDriver");
const {
  createDriver,
} = require("../controllers/controllerDriver/createDriver");
const {
  createImage,
} = require("../controllers/controllerImage/controllerImage");
const {
  addDriverTeam,
} = require("../controllers/controllerTeam/controllerTeam");

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

const handlerCreateDriver = async (request, response) => {
  const register = request.body;
  try {
    const driverFilter = await createDriver({ Driver, register, Nationality });
    await createImage({ Image, register, driverFilter });
    await addDriverTeam({ Team, register, Driver });
    response.json({
      information: `Se creo un nuevo conductor con el id ${driverFilter?.id}`,
      id: driverFilter?.id,
    });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  handlerReadDriver,
  handlerCreateDriver,
};
