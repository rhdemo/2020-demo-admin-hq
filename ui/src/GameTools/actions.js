export const SEND_PING = 'GameTools.SEND_PING';
export const sendPing = () => ({
  type: SEND_PING
});

export const UPDATE_GAME_STATE = 'GameTools.UPDATE_GAME_STATE';
export const updateGameState = (state, username, password) => ({
  type: UPDATE_GAME_STATE,
  payload: {state, username, password}
});

export const RESET_GAME = 'GameTools.RESET_GAME';
export const resetGame = (username, password) => ({
  type: RESET_GAME,
  payload: {username, password}
});

