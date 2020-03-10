export const SEND_PING = 'Home.SEND_PING';
export const sendPing = () => ({
  type: SEND_PING
});

export const UPDATE_GAME_STATE = 'Home.UPDATE_GAME_STATE';
export const updateGameState = (gameState) => ({
  type: UPDATE_GAME_STATE,
  payload: gameState
});

export const RESET_GAME = 'Home.RESET_GAME';
export const resetGame = () => ({
  type: RESET_GAME
});

