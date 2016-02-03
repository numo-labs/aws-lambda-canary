var config = require('./lib/config');
var starwarsService = require ('./lib/starwars-service');

exports.handler = function (event, context) {
  config.init(context, function (err, config) {
    if (err) context.fail(err);
    context.succeed(starwarsService.quote);
  });
}
