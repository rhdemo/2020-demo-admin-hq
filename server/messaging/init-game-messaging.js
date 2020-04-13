const log = require("../utils/log")("game-messaging");
const AMQ_MESSAGE_TYPES = require('./message-types');
const {CLUSTER_NAME, HOSTNAME} = require('../utils/constants');

const options = 'mc/game';

function gameMessageHandler(message) {
  log.debug('receiving message: %o', message);
  const {body} = message;

  if (!body) {
    log.error('Malformed AMQ Message: %o', message);
  }

  const bodyObj = JSON.parse(body);

  switch (bodyObj.type) {
    case 'reset-game':
      log.debug('Game Reset message: %o', bodyObj);
      break;

    case 'game':
      log.debug('Game Update message: %o', bodyObj);
      break;

    default:
      log.debug('Unprocessed AMQ Message: %o', bodyObj);
      break;
  }
}

function initGameMessaging() {
  log.info(`Subscribing to ${options}`);
  const container = require('rhea').create_container({enable_sasl_external: true});
  container.on('connection_open', function (context) {
    global.amqpGameReceiver = context.connection.open_receiver(options);
    global.amqpGameSender = context.connection.open_sender(options);
  });
  container.on('message', function (context) {
    gameMessageHandler(context.message);
  });
  container.once('sendable', function (context) {
    context.sender.send({
      body: JSON.stringify({
        type: AMQ_MESSAGE_TYPES.GAME.CONNECT,
        data: {
          clusterName: CLUSTER_NAME,
          hostname: HOSTNAME,
          date: new Date().toISOString()
        }
      })
    });
  });
  container.connect();
}

module.exports = initGameMessaging;