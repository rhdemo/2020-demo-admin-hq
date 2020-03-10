const Model = require('./model');
const generateUsername = require('./username/generate-username');
const generateAvatar = require('./generate-avatar');

class Player extends Model {
  static get dataClient() {
    return global.playerData;
  }

  constructor() {
    super();
    this.username = generateUsername();
    this.avatar = generateAvatar();
    this.gameId = global.game.id;
    this.score = 0;
    this.lastRound = null;
    this.initCurrentRound(0);
  }

  get dataClient() {
    return global.playerData;
  }

  get attributes() {
    return ['id', 'username', 'avatar', 'gameId', 'score', 'lastRound', 'currentRound'];
  }

  get related() {
    const game = global.game.toDict();
    return {game};
  }
}

module.exports = Player;
