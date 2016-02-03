var events = require('events');
var eventEmitter = new events.EventEmitter();

exports.init = function (context) {

  eventEmitter.on('error', function (err) {
    context.fail(err);
  });

  eventEmitter.on('success', function (message) {
    console.log(context);
    console.log(message);
    context.succeed(message)
  });
}
