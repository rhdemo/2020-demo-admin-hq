const {OUTGOING_MESSAGE_TYPES} = require("../socket-handlers/message-types");

class Configuration {
  constructor(player) {
    const {id, gameId, username, score} = player;
    this.type = OUTGOING_MESSAGE_TYPES.PLAYER_CONFIGURATION;
    this.player = {id, gameId, username, score};
    this.game = global.game;
  }
}

module.exports = Configuration;
