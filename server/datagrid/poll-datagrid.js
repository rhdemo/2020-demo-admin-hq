const log = require("../utils/log")("datagrid/poll-datagrid");
const initGame = require("./init-game-data");
const initPlayers = require("./init-player-data");
const {GAME_DATA_KEYS} = require("./constants");


function pollDatagrid(interval) {
  setTimeout(async () => {
    log.debug("checking Datagrid connections");
    await checkDataClient();
    await checkPlayerClient();
    pollDatagrid(interval);
  }, interval);
}

async function checkDataClient() {
  log.debug("checkDataClient");
  try {
    let game = await Game.find(GAME_DATA_KEYS.CURRENT_GAME)
    if (game) {
      global.game = game;
    } else {
      log.error("Game configuration missing");
    }
  } catch (e) {
    log.error("Error connecting to Infinispan default cache", e.message);
    await reconnectDataClient();
  }
}

async function reconnectDataClient() {
  log.info("Attempting to reconnect to Infinispan default cache");
  try {
    await initGame();
  } catch (e) {
    log.error("Failed to reconnect to Infinispan default cache.  Error: ", e.message);
  }
}

async function checkPlayerClient() {
  log.debug("checkPlayerClient");
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
