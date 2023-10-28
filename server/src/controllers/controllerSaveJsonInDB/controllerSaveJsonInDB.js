const axios = require("axios");
const { Driver, Image, Team } = require("../../db");
const { saveDriverInDB } = require("./saveDriverInDB");
const { saveImageInDB } = require("./saveImageInDB");
const { saveTeamInDB } = require("./saveTeamInDB");
const { saveDriverTeamInDB } = require("./saveDriverTeamInDB");

const createjsonInfo = async () => {
  const { data } = await axios.get(`http://localhost:5000/drivers`);
  return data;
};

const saveJsonInDB = async () => {
  try {
    const jsonInfo = await createjsonInfo();
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
