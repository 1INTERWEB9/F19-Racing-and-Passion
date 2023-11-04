const {
  saveJsonInDB,
} = require("../controllers/controllerSaveJsonInDB/controllerSaveJsonInDB");

const handlerSaveJsonInDB = async (request, response) => {
  const { dev_key } = request.body;
  try {
    await saveJsonInDB({ dev_key });
    response.json("La carga de datos a la DB se ha hecho correctamente");
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  handlerSaveJsonInDB,
};
