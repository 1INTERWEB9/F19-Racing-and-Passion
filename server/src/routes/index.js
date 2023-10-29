const { Router } = require("express");
const { handlerSaveJsonInDB } = require("../handlers/handlerSaveJsonInDB");
const { handlerReadDriver } = require("../handlers/handlerDriver");
const { handlerTeam } = require("../handlers/handlerTeam");
const router = Router();

router.get("/DataBase", handlerSaveJsonInDB);
router.get("/Drivers", handlerReadDriver);
router.get("/Drivers/:id", handlerReadDriver);
router.get("/Teams", handlerTeam);
router.get("/Teams/:id", handlerTeam);
module.exports = router;
