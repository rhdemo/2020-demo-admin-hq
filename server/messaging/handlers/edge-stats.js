const lodashGet = require('lodash/get');
const log = require('../../utils/log')('messaging/game-handler');

async function edgeStatsHandler(bodyObj) {
  log.trace('edgeStatsHandler %o', bodyObj);

  const clusterName = lodashGet(bodyObj, 'data.clusterName');

  if (!clusterName) {
    return;
  }

  if (!global.edgeStats[clusterName]) {
    global.edgeStats[clusterName] = {};
  }

  Object.assign(global.edgeStats[clusterName], lodashGet(bodyObj, 'data') || {})
}

module.exports = edgeStatsHandler;

