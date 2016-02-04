var config = require('./lib/config');
var starwarsService = require('./lib/starwars-service');
var contextHandler = require('./lib/context-handler');

exports.handler = function (event, context) {
  contextHandler.init(context);

  config.init(context, event.stage, function (err, config) {
    if (err) contextHandler.fail(err);

    starwarsService.quote();
  });
};
