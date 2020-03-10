const env = require("env-var");
const log = require("../utils/log")("socket-handlers/init");
const {OUTGOING_MESSAGE_TYPES} = require("../socket-handlers/message-types");

async function initHandler(ws, messageObj) {
  let o = {type: OUTGOING_MESSAGE_TYPES.GAME, data: global.game.toDict(), action: "modify"};
  let msg = JSON.stringify(o);
  ws.send(msg);
}

module.exports = initHandler;
