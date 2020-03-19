const log = require('../utils/log')('reset-game-socket-handler');
const axios = require('../utils/axios');
const Game = require("../models/game");
const { v4: uuidv4 } = require('uuid');
const {OUTGOING_AMQ_MESSAGE_TYPES} = require('../messaging/message-types');
const {GAME_URL} = require('../utils/constants');

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

  try {
    const requestInfo = {
      timeout: 5000,
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      url: new URL('/api/game/save', GAME_URL).href,
      data: {
        id: global.game.id,
        state: global.game.state,
        configuration: global.game.configuration
      }
    };

    log.debug('requestInfo', requestInfo);
    const response = await axios(requestInfo);
    log.debug('response data', response.data);
  } catch (error) {
    log.error('error occurred in http call to game save API:');
    log.error(error.message);
  }
}

module.exports = resetGameHandler;
