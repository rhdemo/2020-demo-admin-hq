const log = require("../utils/log")("datagrid/game");
const {OUTGOING_MESSAGE_TYPES} = require("../socket-handlers/message-types");
const readGame = require("./read-game");
const broadcast = require("../utils/broadcast");

async function gameHandler(client, changeType, key) {
  log.info("broadcasting game change");
  await readGame();
  broadcast(JSON.stringify({
    type: OUTGOING_MESSAGE_TYPES.GAME,
    game: global.game.toDict()
  }));
}


module.exports = gameHandler;

