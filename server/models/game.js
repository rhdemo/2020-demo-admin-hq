const Model = require('./model');
const { GAME_STATES, GAME_DATA_KEYS } = require('./constants');

class Game extends Model {
  static get dataClient() {
    return global.gameData;
  }

  constructor() {
    super();
    this.state = GAME_STATES.LOBBY;
    this.date = new Date();
    this.configuration = {};
  }

  get dataClient() {
    return global.gameData;
  }

  get key() {
    return GAME_DATA_KEYS.CURRENT_GAME;
  }

  get attributes() {
    return ['id', 'state', 'date', 'configuration'];
  }
}

module.exports = Game;
