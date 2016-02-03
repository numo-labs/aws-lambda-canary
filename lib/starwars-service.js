var starwars = require('starwars');
var contextHandler = require('./context-handler');

exports.quote = function () {
  contextHandler.succeed(starwars());
};
