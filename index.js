var config = require('./lib/config');
var starwarsService = require ('./lib/starwars-service');
var contextHandler = require('./lib/context-handler');

exports.handler = function (event, context) {
  contextHandler.init(context);

  starwarsService.quote();
  // config.init(context, function (err, config) {
  //   if (err) context.fail(err);
  // });
}
