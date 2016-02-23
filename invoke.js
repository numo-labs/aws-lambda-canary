var AWS = require('aws-sdk');
var gulp = require('gulp');
var babel = require('gulp-babel');
var zip = require('gulp-zip');
var install = require('gulp-install');
var runSequence = require('run-sequence');
var packageJson = require('./package.json');
var region = 'eu-west-1';
var fs = require('fs');

var functionName = packageJson.name + '-v' + getMajorVersion(packageJson.version);

function getMajorVersion (version) {
  return version.substring(0, version.indexOf('.'));
}

var outputName = packageJson.name + '.zip';

// var IAMRole = process.env.IAM_ROLE;

var filesToPack = ['./index.js', './lib/**/*.*'];

function testInvoke () {
  var lambda = new AWS.Lambda();

  var params = {
    FunctionName: functionName,
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: '{ "key1" : "name" }',
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
