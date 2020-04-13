const log = require('../utils/log')('reset-game-socket-handler');
const { v4: uuidv4 } = require('uuid');
const AMQ_MESSAGE_TYPES = require('../messaging/message-types');
const {GAME_DATA_KEYS, GAME_STATES} = require("../datagrid/game-constants");

async function resetGameHandler(ws, messageObj) {
  await resetBotConfig();
  await resetGame();
}

async function resetBotConfig() {
  let botConfig =  {
    date: new Date().toISOString()
  };

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

async function resetGame() {
  let game =  {
    id: uuidv4(),
    state: GAME_STATES.LOBBY,
    date: new Date().toISOString(),
    configuration: {},
  };

  try {
    global.game = game;
    await global.gameData.put(GAME_DATA_KEYS.CURRENT_GAME, JSON.stringify(game));
  } catch (error) {
    log.error('error occurred creating new game. Error: %o', error);
  }

  try {
    global.amqpGameSender.send({
      content_type: "application/json",
      body: JSON.stringify({
        type: AMQ_MESSAGE_TYPES.GAME.RESET_GAME,
        game: global.game
      })
    });
  } catch (error) {
    log.error('error occurred in sending game reset');
    log.error(error);
  }
}

module.exports = resetGameHandler;
