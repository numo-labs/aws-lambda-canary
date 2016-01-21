var starwars = require('starwars');
var config = require('./lib/config');

exports.handler = function (event, context) {
  config.init(context, function (err, config) {
    if (err) context.fail(err);
    context.succeed(starwars());
  });
}
