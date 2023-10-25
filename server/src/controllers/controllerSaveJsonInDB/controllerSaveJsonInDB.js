const jsonInfo = require("../../../api/db.json");
const { Driver, Image, Team } = require("../../db");
const { saveDriverInDB } = require("./saveDriverInDB");
const { saveImageInDB } = require("./saveImageInDB");
const { saveTeamInDB } = require("./saveTeamInDB");
const { saveDriverTeamInDB } = require("./saveDriverTeamInDB");

const saveJsonInDB = async () => {
  try {
    await saveTeamInDB({ jsonInfo, Team });
    await saveDriverInDB({ jsonInfo, Driver });
    await saveImageInDB({ jsonInfo, Driver, Image });
    await saveDriverTeamInDB({ jsonInfo, Driver, Team });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  saveJsonInDB,
};
