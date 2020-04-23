export const SEND_AUTH_CHECK = 'Home.SEND_AUTH_CHECK';
export const sendAuthCheck = (username, password) => ({
  type: SEND_AUTH_CHECK,
  payload: {username, password}
});

export const SKIP_AUTH_CHECK = 'Home.SKIP_AUTH_CHECK';
export const skipAuthCheck = (skipAuth) => ({
  type: SKIP_AUTH_CHECK,
  payload: {skipAuth}
});