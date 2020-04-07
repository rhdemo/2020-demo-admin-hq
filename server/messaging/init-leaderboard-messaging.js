const log = require("../utils/log")("game-messaging");
const {OUTGOING_AMQ_MESSAGE_TYPES} = require('./message-types');
const {CLUSTER_NAME, HOSTNAME} = require('../utils/constants');

function leaderboardMessageHandler(message) {
  log.debug(message);

  const {body} = message;

  if (!body) {
    log.debug('Malformed AMQ Message', message);
  }


  log.debug('Leadeboard updated', message);
  global.leaderboard = body;
}

function initLeaderboardMessaging() {
  log.info('Subscribing to mc/leaderboard');
  const container = require('rhea').create_container({enable_sasl_external: true});
  container.on('connection_open', function (context) {
    global.amqpLeaderboardReceiver = context.connection.open_receiver('mc/leaderboard');
  });
  container.on('message', function (context) {
    leaderboardMessageHandler(context.message);
  });
  container.connect();
}

module.exports = initLeaderboardMessaging;