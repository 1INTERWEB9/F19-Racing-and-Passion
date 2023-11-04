require("dotenv").config();
const axios = require("axios");
const { Driver, Image, Team, Nationality } = require("../../db");
const { saveDriverInDB } = require("./saveDriverInDB");
const { saveImageInDB } = require("./saveImageInDB");
const { saveTeamInDB } = require("./saveTeamInDB");
const { saveDriverTeamInDB } = require("./saveDriverTeamInDB");
const { saveNationalityInDB } = require("./saveNationalityInDB");
const { DEV_KEY } = process.env;

const createjsonInfo = async () => {
  const { data } = await axios.get(`http://localhost:5000/drivers`);
  return data;
};

const saveJsonInDB = async ({ dev_key }) => {
  try {
    const jsonInfo = await createjsonInfo();
    await saveTeamInDB({ jsonInfo, Team });
    await saveNationalityInDB({ jsonInfo, Nationality });
    if (DEV_KEY == dev_key) {
      await saveDriverInDB({ jsonInfo, Driver, Nationality });
      await saveImageInDB({ jsonInfo, Driver, Image });
      await saveDriverTeamInDB({ jsonInfo, Driver, Team });
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  saveJsonInDB,
};
