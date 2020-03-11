const log = require("../utils/log")("amqp");

var container = require('rhea').create_container({enable_sasl_external: true});
container.on('connection_open', function (context) {
  context.connection.open_receiver('mc/game');
  context.connection.open_sender('mc/game');
});
container.on('message', function (context) {
  log.info(context.message.body);
  context.connection.close();
});
container.on('sendable', function (context) {
  context.sender.send({
    body: {
      game: {
        id: "fakeid-chris",
        state: 'active'
      }
    }
  });
  context.sender.detach();
});
container.connect();

