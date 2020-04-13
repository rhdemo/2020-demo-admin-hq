const lodashGet = require('lodash/get');
const log = require('../../utils/log')('messaging/game-handler');
const {OUTGOING_MESSAGE_TYPES} = require("../../socket-handlers/message-types");
const broadcast = require('../../utils/broadcast');

async function botStatsHandler(bodyObj) {
  log.trace('botStatsHandler %o', bodyObj);

  const hostname = lodashGet(bodyObj, 'data.hostname');
  const clusterName = lodashGet(bodyObj, 'data.clusterName');

  if (!clusterName || !hostname) {
    return;
  }

  if (!global.edgeStats) {
    global.edgeStats = {}
  }

  if (!global.edgeStats[clusterName]) {
    global.edgeStats[clusterName] = {bots:{}}
  }

  if (!global.edgeStats[clusterName]['bots']) {
    global.edgeStats[clusterName]['bots'] = {}
  }

  const originalBots = lodashGet(global.edgeStats, `${clusterName}.bots.${hostname}.bots`)
  global.edgeStats[clusterName]['bots'][hostname] = lodashGet(bodyObj, 'data');
  const newBots = lodashGet(global.edgeStats, `${clusterName}.bots.${hostname}.bots`)
  if (newBots !== originalBots) {
    broadcast(JSON.stringify({
      type: OUTGOING_MESSAGE_TYPES.EDGE_STATS,
      edgeStats: global.edgeStats
    }));
  }
}

module.exports = botStatsHandler;

