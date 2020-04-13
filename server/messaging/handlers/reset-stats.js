const log = require('../../utils/log')('messaging/game-handler');
const {OUTGOING_MESSAGE_TYPES} = require("../../socket-handlers/message-types");
const broadcast = require('../../utils/broadcast');

async function resetStatsHandler(bodyObj) {
  log.trace('resetStatsHandler %o', bodyObj);
  global.edgeStats = {};
  broadcast(JSON.stringify({
    type: OUTGOING_MESSAGE_TYPES.EDGE_STATS,
    edgeStats: global.edgeStats
  }));
}

module.exports = resetStatsHandler;

