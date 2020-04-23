const log = require('../utils/log')('socket-handlers/init');
const {OUTGOING_MESSAGE_TYPES} = require('../socket-handlers/message-types');
const getGameStats = require('./get-game-stats');

async function initHandler(ws, messageObj) {
  let gameStats = getGameStats();
  gameStats.type = OUTGOING_MESSAGE_TYPES.GAME
  let msg = JSON.stringify(gameStats);
  ws.send(msg);
}

module.exports = initHandler;
