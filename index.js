var starwars = require('starwars');
var config = require('./lib/config');

exports.handler = function (event, context) {
  config.init(context, function (err, config) {
    if (err) context.fail(err);

    console.log(config);
    context.succeed(starwars());
  });
}


var result = values.sort((a, b) => a - b);
