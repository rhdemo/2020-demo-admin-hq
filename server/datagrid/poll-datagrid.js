const log = require("../utils/log")("datagrid/poll-datagrid");
const initGame = require("./init-game-data");
const initPlayers = require("./init-player-data");
const {GAME_DATA_KEYS} = require("../models/constants");
const Game = require("../models/game");


function pollDatagrid(interval) {
  setTimeout(async () => {
    log.debug("checking Datagrid connections");
    await checkGameClient();
    await checkPlayerClient();
    pollDatagrid(interval);
  }, interval);
}

async function checkGameClient() {
  log.debug("check Infinispan Game Client");
  try {
    let game = await Game.find(GAME_DATA_KEYS.CURRENT_GAME);
    if (game) {
      global.game = game;
    } else {
      log.error("Game configuration missing");
    }
  } catch (e) {
    log.error("Error connecting to Infinispan game cache", e.message);
    await reconnectGameClient();
  }
}

async function reconnectGameClient() {
  log.info("Attempting to reconnect to Infinispan game cache");
  try {
    await initGame();
  } catch (e) {
    log.error("Failed to reconnect to Infinispan game cache.  Error: ", e.message);
  }
}

async function checkPlayerClient() {
  log.debug("check Infinispan Player Client");
  try {
    global.playerStats = await global.playerData.stats();
  } catch (e) {
    log.error("Error connecting to Infinispan players cache", e.message);
    await reconnectPlayerClient();
  }
}

async function reconnectPlayerClient() {
  log.info("Attempting to reconnect to Infinispan players cache");
  try {
    await initPlayers();
  } catch (e) {
    log.error("Failed to reconnect to Infinispan players cache.  Error: ", e.message);
  }
}


module.exports = pollDatagrid;
