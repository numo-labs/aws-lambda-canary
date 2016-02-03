var starwars = require('starwars');
var contextEmitter = require('./context-emitter');

exports.quote = function () {
  contextEmitter.emit('success', starwars());
}
