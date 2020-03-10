'use strict';

const path = require('path');
const AutoLoad = require('fastify-autoload');
const log = require('./utils/log')('admin-server');
const broadcast = require('./utils/broadcast');
const globalHandler = require('./socket-handlers/global');
const initGameData = require('./datagrid/init-game-data');
const initPlayerData = require('./datagrid/init-player-data');


const opts = {};
const {PORT, IP, LOG_LEVEL} = require('./utils/constants');
const wsOpts = {
  maxPayload: 100 * 1024 * 1024 // 100mb
};

const fastify = require('fastify')();

global.game = {
  id: null,
  state: "loading"
};
global.players = {};
global.socketServer = null;

//---------------------
// Fastify Plugins

//---------------------
// Custom Plugins
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins'),
  options: Object.assign({}, opts)
});

//---------------------
// Decorators

//---------------------
// Hooks and Middlewares

//---------------------
// Services
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'services'),
  options: Object.assign({}, opts)
});

// Global Websocket
fastify.register(require('fastify-websocket'), {
  handle: globalHandler,
  options: wsOpts
}).after(err => {
  global.socketServer = fastify.websocketServer;
  initGameData()
    .then(() => initPlayerData());
  setInterval(function () {
    broadcast('heartbeat');
  }, 5000);
});


fastify.listen(PORT, IP, function (err, address) {
  if (err) {
    log.error(err);
    process.exit(1);
  }
  log.info(`server listening on ${address}`);
});



