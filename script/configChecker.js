var request = require('request');
var url = 'https://f0uih51vu0.execute-api.eu-west-1.amazonaws.com/';

exports.init = function (context) {

  var environment = getEnvironment();
  
  request.post({
    url: url,
    body: { functionName: context.functionName }
  }, function (error, response, body) {
    if (err) context.fail(err);
    console.log(body);
  });

  function getEnvironment() {
    var invokedFunctionArn = context.invokedFunctionArn;
    return invokedFunctionArn.substring(invokedFunctionArn.lastIndexOf(':') + 1, invokedFunctionArn.length);
  }
}
