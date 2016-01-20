var starwars = require('starwars');

exports.handler = function (event, context) {
  context.succeed(starwars());
}
