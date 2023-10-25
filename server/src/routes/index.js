const { Router } = require("express");
const { handlerSaveJsonInDB } = require("../handlers/handlerSaveJsonInDB");
const router = Router();

router.get("/DataBase", handlerSaveJsonInDB);

module.exports = router;
