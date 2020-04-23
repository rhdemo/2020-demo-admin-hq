export const SEND_BOT_PING = 'Bots.SEND_BOT_PING';
export const sendBotPing = (username, password) => ({
  type: SEND_BOT_PING,
  payload: {username, password}
});

export const UPDATE_BOT_CONFIG = 'Bots.SEND_BOT_CONFIG';
export const updateBotConfig = (method, botConfig, username, password) => ({
  type: UPDATE_BOT_CONFIG,
  payload: {method, botConfig, username, password}
});

