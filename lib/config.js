var request = require('request');
var fs = require('fs');
var uri = 'https://f0uih51vu0.execute-api.eu-west-1.amazonaws.com/ci/internal/config';
var environments = ['prod', 'ci'];
var contextHandler = require('./context-handler');

exports.gateway = uri;

exports.init = function (context) {

  var environment = getEnvironment(); // ci or prod

  if(~environments.indexOf(environment)) {

    var fileName = computeFileName(context.functionName, environment); // E.g. aws-lambda-canary-v1-ci.json

    try {
      contextHandler.succeed(require('/tmp/' + fileName));
    } catch (ex) {
      request.get(uri + '?fileName=' + fileName , function (error, response, body) {
        if (error) contextHandler.fail(error);
        else {
          fs.writeFile('/tmp/' + fileName, JSON.stringify(body), "utf8", function (error, resp) {
            if (error) contextHandler.fail(error);
            else contextHandler.succeed(body);
          });
        }
      });
    }
  } else {
    contextHandler.fail('Environments are not correctly configured.');
  }

  // E.g function-v1-ci.json or function-v1-prod.json
  function computeFileName(name, environment) {
    return name + '-' + environment + '.json';
  }

  // E.g 1.0.0 becomes 1
  function getMajorVersion (version) {
    return version.substring(0, version.indexOf('.'));
  }

  function getEnvironment() {
    var invokedFunctionArn = context.invokedFunctionArn;
    return invokedFunctionArn.substring(invokedFunctionArn.lastIndexOf(':') + 1, invokedFunctionArn.length);
  }
}
