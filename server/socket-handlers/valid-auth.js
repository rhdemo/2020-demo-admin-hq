const {OUTGOING_MESSAGE_TYPES} = require('../socket-handlers/message-types');
const getAuth = require('./get-auth');

function validAuth(ws, messageObj) {
  const validAuth = getAuth(messageObj);
  if (!validAuth) {
    let errorObj = {
      type: OUTGOING_MESSAGE_TYPES.ERROR,
      error: {
        code: 401,
        status: 'Unauthorized',
        message: 'Unauthorized: Incorrect username or password.'
      },
      validAuth
    };
    let msg = JSON.stringify(errorObj);
    ws.send(msg);
  }
  return validAuth;
}

module.exports = validAuth;
