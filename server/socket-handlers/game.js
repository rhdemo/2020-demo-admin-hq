const log = require('../utils/log')('game-socket-handler');
const Game = require('../models/game');
const {GAME_DATA_KEYS} = require('../models/constants');
const {OUTGOING_AMQ_MESSAGE_TYPES} = require('../messaging/message-types');

async function gameHandler(ws, messageObj) {
  let game;
  try {
    game = await Game.find(GAME_DATA_KEYS.CURRENT_GAME);
  } catch (error) {
    log.error('Failed to read game. Error:', error.message);
    return;
  }

  if (!game) {
    game = new Game();
  }

  game.updateAttributes(messageObj.game);

  try {
    await game.save();
  } catch (error) {
    log.error('Failed to update game. Error:', error.message);
    return;
  }

  global.game = game;

  try {
    global.amqpGameSender.send({
      content_type: "application/json",
      body: JSON.stringify({
        type: OUTGOING_AMQ_MESSAGE_TYPES.GAME,
        game: global.game.toDict()
      })
    });
  } catch (error) {
    log.error('error occurred in sending game update');
    log.error(error);
  }
}

module.exports = gameHandler;

