var starwars = require('starwars');
var config = require('./lib/config');

exports.handler = function (event, context) {
  // Check config
  config.init(context, function (config) {
    console.log(config);
    context.succeed(starwars());
  });
}
