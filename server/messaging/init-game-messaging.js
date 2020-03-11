const log = require("../utils/log")("game-messaging");
const {OUTGOING_AMQ_MESSAGE_TYPES} = require('./message-types');
const {CLUSTER_NAME, HOSTNAME} = require('../utils/constants');

function gameMessageHandler(message) {
  log.info(message);

  const {body} = message;

  if (!body) {
    log.debug('Malformed AMQ Message', message);
  }

  switch (body.type) {
    default:
      log.debug('Unprocessed AMQ Message', message);
      break;
  }
}

function initGameMessaging() {
  const container = require('rhea').create_container({enable_sasl_external: true});
  container.on('connection_open', function (context) {
    global.amqpReceiver = context.connection.open_receiver('mc/game');
    global.amqpSender = context.connection.open_sender('mc/game');
  });
  container.on('message', function (context) {
    gameMessageHandler(context.message);
  });
  container.once('sendable', function (context) {
    context.sender.send({
      body: {
        type: OUTGOING_AMQ_MESSAGE_TYPES.CONNECT,
        data: {
          clusterName: CLUSTER_NAME,
          hostname: HOSTNAME,
          date: new Date().toISOString()
        }
      }
    });
  });
  container.connect();
}

module.exports = initGameMessaging;