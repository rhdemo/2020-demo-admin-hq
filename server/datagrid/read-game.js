const log = require("../utils/log")("datagrid/read-game");
const Game = require("../models/game");
const {GAME_DATA_KEYS} = require("../datagrid/constants");


async function readGame() {
  try {
    global.game = await Game.find(GAME_DATA_KEYS.CURRENT_GAME);
    if (!global.game) {
      log.error("Game configuration missing");
      global.game = {};
    }
    return global.game;
  } catch (error) {
    log.error("Failed to read game. Error:", error.message);
  }
}

module.exports = readGame;
