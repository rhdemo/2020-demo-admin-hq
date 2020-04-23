import lodashGet from 'lodash/get';

import { SKIP_AUTH_CHECK, SEND_AUTH_CHECK } from '../Home/actions';
import {
  WS_OPEN,
  WS_INCOMING_MESSAGE,
  WS_MAX,
  WS_CLOSE,
  WS_ERROR
} from '../Socket/actions';
import { INCOMING_MESSAGE_TYPES } from '../Socket/messageTypes';

const initialState = {
  connection: null,
  connectionUrl: null,
  connectionError: null,
  game: null,
  leaderboard: null,
  lastHeartbeat: null,
  skipAuth: false,
  validAuth: false,
  username: null,
  password: null
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SKIP_AUTH_CHECK:
      return {
        ...state,
        username: null,
        password: null,
        validAuth: false,
        skipAuth: action.payload.skipAuth || false
      };
    case SEND_AUTH_CHECK:
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        validAuth: false,
        skipAuth: false
      };
    case WS_OPEN:
      return {
        ...state,
        connection: 'connected',
        connectionUrl: action.payload.url
      };
    case WS_CLOSE:
      return {
        ...state,
        connection: 'disconnected'
      };
    case WS_MAX:
      return {
        ...state,
        connection: 'lost'
      };
    case WS_ERROR:
      return {
        ...state,
        connectionError: action.payload.error
      };
    case WS_INCOMING_MESSAGE:
      return processWsMessage(state, action.payload);
    default:
      return state;
  }
};

function processWsMessage(state, message) {
  const {type, ...data} = message;
  let newValues = {};

  switch (type) {
    case INCOMING_MESSAGE_TYPES.AUTH_RESPONSE:
      updateLocalStorage(state, message);
      newValues = data;
      break;
    case INCOMING_MESSAGE_TYPES.HEARTBEAT:
      newValues = data;
      newValues.lastHeartbeat = new Date();
        break;
    default:
      newValues = data;
  }
  return {...state, ...newValues, loading: false, connection: 'connected'};
}


function updateLocalStorage(state, message) {
  // yes, I know how bad this is
  const username = lodashGet(state, 'username');
  const password = lodashGet(state, 'password');
  const validAuth = lodashGet(message, 'validAuth');

  if (!validAuth) {
    return;
  }
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);
}