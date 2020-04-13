const merge = require('lodash/merge');
const log = require('../utils/log')('bot-ping-socket-handler');
const AMQ_MESSAGE_TYPES = require('../messaging/message-types');
const {GAME_DATA_KEYS} = require("../datagrid/game-constants");

async function botConfigHandler(ws, messageObj) {
  log.trace('botConfigHandler');
  let botConfig = {};
  try {
    let str = await global.gameData.get(GAME_DATA_KEYS.BOT_CONFIG);
    if (str) {
      botConfig = JSON.parse(str);
    } else {
      log.error("Bot configuration missing");
    }
  } catch (error) {
    log.error('Failed to read game. Error: %o', error);
  }

  if (messageObj.method === 'PUT') {
    botConfig = messageObj.botConfig || {};
  } else if (messageObj.botConfig){
    merge(botConfig, messageObj.botConfig);
  }

  try {
    global.botConfig = botConfig;
    await global.gameData.put(GAME_DATA_KEYS.BOT_CONFIG, JSON.stringify(botConfig));
  } catch (error) {
    log.error('error occurred creating new game. Error: %o', error);
  }

  try {
    global.amqpAdminSender.send({
      content_type: "application/json",
      body: JSON.stringify({
        type: AMQ_MESSAGE_TYPES.ADMIN.BOT_CONFIG,
        botConfig: global.botConfig
      })
    });
  } catch (error) {
    log.error('error occurred in sending game reset');
    log.error(error);
  }
}

module.exports = botConfigHandler;

