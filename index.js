
var starwarsService = require('./lib/starwars-service');

exports.handler = function (event, context) {
  config.init(context, function (err, config) {
    starwarsService.quote(function (err, message) {
      if (err) context.fail(err);
      context.succeed(message);
    });
  });
};
