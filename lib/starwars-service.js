var starwars = require('starwars');
var emitter = require('./context-handler').eventEmitter;

exports.quote = function () {
  emitter.emit('success', starwars());
}
