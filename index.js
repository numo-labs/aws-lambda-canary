var starwarsService = require('./lib/starwars-service');

exports.handler = function (event, context) {
  starwarsService.quote(function (err, message) {
    if (err) {
      context.fail({
        statusCode: 500,
        message: err
      });
    }
    context.succeed({
      statusCode: 200,
      message: message
    });
  });
};
