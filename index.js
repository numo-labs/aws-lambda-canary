var starwars = require('starwars');
var configChecker = require('./scripts/configChecker');

exports.handler = function (event, context) {
  // Check config
  var config = configChecker.init(context);

  context.succeed(starwars());
}
