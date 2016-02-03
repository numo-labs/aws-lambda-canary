var events = require('events');
var eventEmitter = new events.EventEmitter();

exports.succeed = function (message) {
  eventEmitter.emit('succeed', message);
};

exports.fail = function (error) {
  eventEmitter.emit('fail', error);
};

exports.init = function (context) {
  eventEmitter.on('succeed', function (message) {
    context.succeed(message);
  });

  eventEmitter.on('fail', function (error) {
    context.fail(error);
  });
};
