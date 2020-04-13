const WebSocket = require("ws");
const log = require("./log")("send");

function send(wsConnection, msg) {
  log.debug("send: %o", msg);
  try {
    if (wsConnection.readyState === WebSocket.OPEN) {
      wsConnection.send(msg);
    } else {
      log.warn("Attempted to send message on closed socket");
    }
  } catch (error) {
    log.error("Failed to send message.  Error: %o", error);
  }
}

module.exports = send;

