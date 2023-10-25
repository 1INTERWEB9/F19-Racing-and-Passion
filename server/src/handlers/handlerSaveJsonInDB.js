const {
  saveJsonInDB,
} = require("../controllers/controllerSaveJsonInDB/controllerSaveJsonInDB");

const handlerSaveJsonInDB = async (request, response) => {
  try {
    await saveJsonInDB();
    response.json("La carga del API se ha realizado correctamente");
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  handlerSaveJsonInDB,
};
