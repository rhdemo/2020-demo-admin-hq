export const RESET_GAME = 'GameStatus.RESET_GAME';
export const resetGame = (username, password) => ({
  type: RESET_GAME,
  payload: {username, password}
});

