export const SEND_PING = 'GameTools.SEND_PING';
export const sendPing = () => ({
  type: SEND_PING
});

export const UPDATE_GAME_STATE = 'GameTools.UPDATE_GAME_STATE';
export const updateGameState = (gameState) => ({
  type: UPDATE_GAME_STATE,
  payload: gameState
});

export const RESET_GAME = 'GameTools.RESET_GAME';
export const resetGame = () => ({
  type: RESET_GAME
});

