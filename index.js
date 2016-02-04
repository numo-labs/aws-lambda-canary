
var starwarsService = require('./lib/starwars-service');

exports.handler = function (event, context) {
  starwarsService.quote(function (err, message) {
    if (err) context.fail(err);
    context.succeed(message);
  });
};
