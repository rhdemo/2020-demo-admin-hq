const log = require('../utils/log')('socket-handlers/auth-check');
const {OUTGOING_MESSAGE_TYPES} = require('../socket-handlers/message-types');
const getAuth = require('./get-auth');

async function authCheckHandler(ws, messageObj) {
  let o = {type: OUTGOING_MESSAGE_TYPES.AUTH_RESPONSE};
  o.validAuth = getAuth(messageObj);
  let msg = JSON.stringify(o);
  ws.send(msg);
}

module.exports = authCheckHandler;
