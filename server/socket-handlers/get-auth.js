const log = require('../utils/log')('socket-handlers/validate-auth');
const {ADMIN_USERNAME, ADMIN_PASSWORD} = require('../utils/constants');

function getAuth(messageObj) {
  const {username, password} = messageObj;
  return ((username === ADMIN_USERNAME) && (password === ADMIN_PASSWORD));
}

module.exports = getAuth;
