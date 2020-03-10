const Game = require("../models/game");
const Player = require("../models/player");

async function resetGameHandler(ws, messageObj) {
  const gameDeleteAllPromise = Game.deleteAll();
  const playerDeleteAllPromise = Player.deleteAll();
  try {
    await gameDeleteAllPromise;
    await playerDeleteAllPromise;
  } catch (error) {
    log.error(`error occurred resetting players and game. Error:`, error.message);
  }

  try {
    let game = new Game();
    await game.save();
  } catch (error) {
    log.error(`error occurred creating new game. Error:`, error.message);
  }
}

module.exports = resetGameHandler;
