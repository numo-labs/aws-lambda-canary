var starwarsService = require('./lib/starwars-service');
// var config          = require('./lib/config.js');

exports.handler = function (event, context) {
  starwarsService.quote(event.isHuman, function (err, message) {
    if (err) {
      return context.fail(JSON.stringify({
        statusCode: 500,
        message: err
      }));
    } else {
      return context.succeed({
        statusCode: 200,
        message: message
      });
    }
  });
};
