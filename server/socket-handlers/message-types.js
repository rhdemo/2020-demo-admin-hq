module.exports.INCOMING_MESSAGE_TYPES = {
  INIT: 'init',
  UPDATE_GAME: "update-game",
  PING: "ping",
  RESET_GAME: "reset-game"
};

module.exports.OUTGOING_MESSAGE_TYPES = {
  ERROR: 'error',
  HEARTBEAT: 'heartbeat',
  GAME: 'game',
  PING_RESPONSE: 'pong'
};
