function getGameStats() {
  return {
    game: global.game,
    polledLeaderboard: global.polledLeaderboard,
    leaderboard: global.leaderboard,
    edgeStats: global.edgeStats,
    botConfig: global.botConfig
  };
}

module.exports = getGameStats;