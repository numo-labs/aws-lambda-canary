var AWS = require('aws-sdk');
AWS.config.region = process.env.AWS_REGION;
var lambda = new AWS.Lambda();
var pkg = require('./package.json');

function getMajorVersion (version) {
  return version.substring(0, version.indexOf('.'));
}

function testInvoke () {
  var functionName = pkg.name + '-v' + getMajorVersion(pkg.version)
  var params = {
    FunctionName: functionName,
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: '{ "isHuman" : true }',
    Qualifier: 'ci' // see: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Lambda.html#invoke-property
  };

  lambda.getFunction({ FunctionName: functionName }, function (err, data) {
    if (err) console.log('FUNCTION NOT FOUND', err);
    else invokeFunction();
  });

  function invokeFunction () {
    lambda.invoke(params, function (err, data) {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });
  }
}

module.exports = testInvoke;

testInvoke();
