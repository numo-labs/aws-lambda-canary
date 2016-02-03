var starwars = require('starwars');
var contextEmitter = require('./context-emitter').eventEmitter;

exports.quote = function () {
  contextEmitter.emit('success', starwars());
}
