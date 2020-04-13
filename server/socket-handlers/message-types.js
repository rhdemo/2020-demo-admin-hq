module.exports.INCOMING_MESSAGE_TYPES = {
  INIT: 'init',
  UPDATE_GAME: 'update-game',
  PING: 'ping',
  RESET_GAME: 'reset-game',
  BOT_PING: 'bot-ping',
  BOT_CONFIG: 'bot-config'
};

module.exports.OUTGOING_MESSAGE_TYPES = {
  ERROR: 'error',
  HEARTBEAT: 'heartbeat',
  GAME: 'game',
  BOT_CONFIG: 'bot-config',
  EDGE_STATS: 'edge-stats',
  PING_RESPONSE: 'pong'
};
