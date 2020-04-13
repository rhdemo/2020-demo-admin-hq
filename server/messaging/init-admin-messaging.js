const log = require("../utils/log")("bot-messaging");
const AMQ_MESSAGE_TYPES = require('./message-types');
const {CLUSTER_NAME, HOSTNAME} = require('../utils/constants');
const edgeStatsHandler = require('./handlers/edge-stats');
const botStatsHandler = require('./handlers/bot-stats');
const resetStatsHandler = require('./handlers/reset-stats');

const options = 'mc/admin';

function botMessageHandler(message) {
  log.trace('botMessageHandler receiving message: %o', message);
  const {body} = message;

  if (!body) {
    log.error('Malformed AMQ Message: %o', message);
  }

  const bodyObj = JSON.parse(body);

  switch (bodyObj.type) {
    case AMQ_MESSAGE_TYPES.ADMIN.EDGE_STATS:
      log.trace('Edge stats message: %o', bodyObj);
      edgeStatsHandler(bodyObj);
      break;

    case AMQ_MESSAGE_TYPES.ADMIN.BOT_STATS:
      log.trace('Edge stats message: %o', bodyObj);
      botStatsHandler(bodyObj);
      break;

    case AMQ_MESSAGE_TYPES.ADMIN.RESET_STATS:
      log.trace('Reset stats message: %o', bodyObj);
      resetStatsHandler(bodyObj);
      break;


    // case MESSAGE_TYPES.ADMIN.BOT_CONFIG:
    //   log.debug('Bot Config message: %o', bodyObj);
    //   break;
    //
    // case MESSAGE_TYPES.ADMIN.BOT_PING:
    //   log.debug('Bot Ping message: %o', bodyObj);
    //   break;

    default:
      log.debug('Unprocessed AMQ Message: %o, %o', options, bodyObj);
      break;
  }
}

function initAdminMessaging() {
  const container = require('rhea').create_container({enable_sasl_external: true});
  container.on('connection_open', function (context) {
    global.amqpAdminReceiver = context.connection.open_receiver(options);
    global.amqpAdminSender = context.connection.open_sender(options);
  });
  container.on('message', function (context) {
    botMessageHandler(context.message);
  });
  container.once('sendable', function (context) {
    context.sender.send({
      body: JSON.stringify({
        type: AMQ_MESSAGE_TYPES.ADMIN.CONNECT,
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

module.exports = initAdminMessaging;