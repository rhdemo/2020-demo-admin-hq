const proxy = require('http-proxy-middleware');


module.exports = function(app) {
  if (process.env.REACT_APP_ADMIN_SOCKET_URL) {
    return;
  }

  let serverPort = process.env.ADMIN_SERVER_PORT || '8083';

  app.use(proxy('/socket', {
    target: `http://0.0.0.0:${serverPort}`,
    ws: true
  }));

  app.use(proxy('/api', {
    target: `http://0.0.0.0:${serverPort}`,
    ws: false,
    pathRewrite: {
      '^/api': '/'
    }
  }));
};
