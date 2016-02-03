var events = require('events');
var eventEmitter = new events.EventEmitter();
var _context;

exports.success = function(message) {
  eventEmitter.on('success', function (message) {
    _context.succeed(message)
  });
};

exports.fail = function(error) {
  eventEmitter.on('error', function (err) {
    _context.fail(err);
  });
};

exports.init = function (context) {
  _context = context;
};
