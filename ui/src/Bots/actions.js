export const SEND_BOT_PING = 'Bots.SEND_BOT_PING';
export const sendBotPing = () => ({
  type: SEND_BOT_PING
});

export const UPDATE_BOT_CONFIG = 'Bots.SEND_BOT_CONFIG';
export const updateBotConfig = (method, botConfig) => ({
  type: UPDATE_BOT_CONFIG,
  payload: {method, botConfig}
});

