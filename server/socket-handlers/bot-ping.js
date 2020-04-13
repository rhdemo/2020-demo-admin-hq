const log = require('../utils/log')('bot-ping-socket-handler');
const AMQ_MESSAGE_TYPES = require('../messaging/message-types');

async function botPingHandler(ws, messageObj) {
  resetStats();
  setTimeout(() => pingBots(), 200);
}

function resetStats() {
  try {
    global.amqpAdminSender.send({
      content_type: "application/json",
      body: JSON.stringify({
        type: AMQ_MESSAGE_TYPES.ADMIN.RESET_STATS
      })
    });
  } catch (error) {
    log.error('error occurred in sending ping to bots');
    log.error(error);
  }
}

function pingBots() {
  try {
    global.amqpAdminSender.send({
      content_type: "application/json",
      body: JSON.stringify({
        type: AMQ_MESSAGE_TYPES.ADMIN.BOT_PING
      })
    });
  } catch (error) {
    log.error('error occurred in sending ping to bots');
    log.error(error);
  }
}

module.exports = botPingHandler;

