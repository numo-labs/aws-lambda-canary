var starwars = require('starwars');
var contextHandler = require('./context-handler');

exports.quote = function () {
  console.log('Triggering quote');
  contextHandler.success(starwars());
}
