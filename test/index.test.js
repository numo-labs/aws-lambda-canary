'use strict';
var assert = require('assert');
var index  = require('../index.js');
var utils  = require('aws-lambda-test-utils');
var mockContextCreator = utils.mockContextCreator;

var ctxOpts = {
  functionName: 'LambdaTest',
  functionVersion: '1',
  invokedFunctionArn: 'arn:aws:lambda:eu-west-1:655240711487:function:LambdaTest:ci'
};

describe('Lambda Handler Tests', function () {
  it('error: context:done called without a quote when the event isHuman property is false', function (done) {
    function test (error) {
      assert.equal(error, "Sorry you're not a human");
      done();
    }
    var context = mockContextCreator(ctxOpts, test);
    index.handler({ isHuman: false }, context);
  });
  it('success: context.succeed called with quote when the event isHuman property is true', function (done) {
    function test (result) {
      assert(result.length > 5);
      done();
    }
    var context = mockContextCreator(ctxOpts, test);
    index.handler({ isHuman: true }, context);
  });
  it('error: context:fail called with error when no functionARN specified in the context object', function (done) {
    function test (error) {
      assert.equal(error, 'Environments are not correctly configured.');
      done();
    }
    var context = mockContextCreator({}, test);
    index.handler({ isHuman: true }, context);
  });
});
