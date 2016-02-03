var events = require('events');
var eventEmitter = new events.EventEmitter();
var _context;

exports.succeed = function(message) {
  console.log('triggered succeed');
  eventEmitter.emit('succeed', message);
};

exports.fail = function(error) {
  console.log('triggered fail');
  eventEmitter.emit('fail', error);
};

exports.init = function (context) {
  eventEmitter.on('succeed', function(message) {
    console.log('emitted succeed');
    context.succeed(message);
  });
  eventEmitter.on('fail', function(error) {
    console.log('emitted fail');
    context.fail(error);
  });
};
