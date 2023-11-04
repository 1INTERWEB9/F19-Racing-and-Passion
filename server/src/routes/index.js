const { Router } = require("express");
const { handlerSaveJsonInDB } = require("../handlers/handlerSaveJsonInDB");
const {
  handlerReadDriver,
  handlerCreateDriver,
} = require("../handlers/handlerDriver");
const { handlerReadTeam } = require("../handlers/handlerTeam");
const { handlerReadNationality } = require("../handlers/handlerNationality");
const router = Router();

router.post("/DataBase", handlerSaveJsonInDB);

router.get("/Drivers", handlerReadDriver);
router.get("/Drivers/:id", handlerReadDriver);
router.post("/Drivers", handlerCreateDriver);

router.get("/Teams", handlerReadTeam);
router.get("/Teams/:id", handlerReadTeam);

router.get("/Nationalities", handlerReadNationality);
router.get("/Nationalities/:id", handlerReadNationality);

// router.post()
module.exports = router;
