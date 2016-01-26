var request = require('request');
var fs = require('fs');
var uri = 'https://f0uih51vu0.execute-api.eu-west-1.amazonaws.com/ci/internal/config';
var environments = ['prod', 'ci'];

exports.gateway = uri;

exports.init = function (context, environment, next) {
  if (~environments.indexOf(environment)) {
    var fileName = computeFileName(context.functionName, environment); // E.g. aws-lambda-canary-v1-ci.json

    try {
      next(null, require('/tmp/' + fileName));
    } catch (ex) {
      request.get(uri + '?fileName=' + fileName, function (error, response, body) {
        if (error) next(error);
        else {
          fs.writeFile('/tmp/' + fileName, JSON.parse(body), 'utf8', function (err, resp) {
            if (err) next(err);
            else next(null, JSON.parse(body));
          });
        }
      });
    }
  } else {
    next('Environments are not correctly configured.');
  }

  // E.g function-v1-ci.json or function-v1-prod.json
  function computeFileName (name, environment) {
    return name + '-' + environment + '.json';
  }
};
