var config = require('./lib/config');
var starwarsService = require ('./lib/starwars-service');
var contextEmitter = require('./lib/context-emitter');



exports.handler = function (event, context) {
  contextEmitter.init(context);
  config.init(context, function (err, config) {
    if (err) context.fail(err);
  });
}
