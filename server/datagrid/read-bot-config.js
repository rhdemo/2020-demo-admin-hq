const log = require("../utils/log")("datagrid/read-bot-config");
const {GAME_DATA_KEYS} = require("./game-constants");


async function readBotConfig() {
  try {
    let str = await global.gameData.get(GAME_DATA_KEYS.BOT_CONFIG);
    if (str) {
      global.botConfig = JSON.parse(str);
    } else {
      log.error("Bot configuration missing");
    }
    return global.botConfig;
  } catch (error) {
    log.error("Failed to read botConfig. Error:", error.message);
  }
}

module.exports = readBotConfig;
