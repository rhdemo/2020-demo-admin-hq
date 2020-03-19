const log = require('../utils/log')('reset-game-socket-handler');
const Game = require("../models/game");
const { v4: uuidv4 } = require('uuid');
const {OUTGOING_AMQ_MESSAGE_TYPES} = require('../messaging/message-types');

async function resetGameHandler(ws, messageObj) {
  try {
    let game = new Game();
    game.id = uuidv4();
    await game.save();
    global.game = game;
  } catch (error) {
    log.error(`error occurred creating new game. Error:`, error.message);
  }

  try {
    global.amqpSender.send({
      content_type: "application/json",
      body: {
        type: OUTGOING_AMQ_MESSAGE_TYPES.RESET_GAME,
        game: global.game.toDict()
      }
    });
  } catch (error) {
    log.error('error occurred in sending game reset');
    log.error(error);
  }
}

module.exports = resetGameHandler;
