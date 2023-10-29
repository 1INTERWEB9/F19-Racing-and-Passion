const { Router } = require("express");
const { handlerSaveJsonInDB } = require("../handlers/handlerSaveJsonInDB");
const { handlerReadDriver } = require("../handlers/handlerDriver");
const router = Router();

router.get("/DataBase", handlerSaveJsonInDB);
router.get("/Drivers", handlerReadDriver);
router.get("/Drivers/:id", handlerReadDriver);
module.exports = router;
