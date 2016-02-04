'use strict';
var assert         = require('assert');
var index          = require('../index.js');
var contextCreator = require('./utils/mockContext.js');

describe('Lambda Handler Tests', function () {
  it('Calls context.succeed with quote', function (done) {
    function test (result) {
      assert(result.length > 5);
      done();
    }
    var context = contextCreator(test);
    index.handler({}, context);
  });
  it('Calls context:fail with error when no functionARN specified', function (done) {
    function test (error) {
      assert.equal(error, 'Environments are not correctly configured.');
      done();
    }
    var context1 = contextCreator(test);
    delete context1.invokedFunctionArn;
    index.handler({}, context1);
  });
});
