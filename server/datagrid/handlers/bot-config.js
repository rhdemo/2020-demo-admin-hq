const log = require("../../utils/log")("datagrid/game");
const {OUTGOING_MESSAGE_TYPES} = require("../../socket-handlers/message-types");
const readBotConfig = require("../read-bot-config");
const broadcast = require("../../utils/broadcast");

async function gameHandler(client, changeType, key) {
  log.info("broadcasting game change");
  await readBotConfig();
  broadcast(JSON.stringify({
    type: OUTGOING_MESSAGE_TYPES.BOT_CONFIG,
    botConfig: global.botConfig
  }));
}


module.exports = gameHandler;

