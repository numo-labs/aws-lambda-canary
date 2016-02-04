
var starwarsService = require('./lib/starwars-service');
var config          = require('./lib/config.js');

exports.handler = function (event, context) {
  config.init(context, function (err, config) {
    if (err) { context.done(err, null); }
    else {
      starwarsService.quote(event.isHuman, function (err, message) {
        if (err) { context.fail(err); }
        else { context.succeed(message); }
      });
    }
  });
};
