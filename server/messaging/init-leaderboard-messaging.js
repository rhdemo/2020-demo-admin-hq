const log = require("../utils/log")("leaderboard-messaging");

const options = 'mc/leaderboard';

function leaderboardMessageHandler(message) {
  log.trace('receiving message: %o', message);

  const {body} = message;

  if (!body) {
    log.warn('Malformed AMQ Message: %o', message);
  }

  log.trace('Leadeboard updated: %o', message);
  global.leaderboard = JSON.parse(body);
}

function initLeaderboardMessaging() {
  log.info(`Subscribing to ${options}`);
  const container = require('rhea').create_container({enable_sasl_external: true});
  container.on('connection_open', function (context) {
    global.amqpLeaderboardReceiver = context.connection.open_receiver(options);
  });
  container.on('message', function (context) {
    leaderboardMessageHandler(context.message);
  });
  container.connect();
}

module.exports = initLeaderboardMessaging;