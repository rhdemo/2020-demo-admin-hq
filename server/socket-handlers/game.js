const log = require('../utils/log')('game-socket-handler');
const axios = require('../utils/axios');
const Game = require('../models/game');
const {GAME_DATA_KEYS} = require('../models/constants');
const {GAME_URL} = require('../utils/constants');

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
    const requestInfo = {
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      url: new URL('/api/game/save', GAME_URL).href,
      data: {
        id: game.id,
        state: game.state,
        configuration: game.configuration
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

module.exports = gameHandler;

