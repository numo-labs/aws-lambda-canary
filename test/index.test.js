'use strict';
import assert from 'assert';
import index from '../index.js';
import contextCreator from './utils/mockContext.js';

describe('Handler:', () => {
  it('Calls context.succeed with quote', done => {
    const test = (result) => {
      console.log("RESULT", result)
      assert(result.length > 5);
      done();
    };
    const context = contextCreator(test);
    index.handler({}, context);
  });
  it('Calls context:fail with error when no functionARN specified', done => {
    const test1 = (error) => {
      assert.equal(error, 'Environments are not correctly configured.');
      done();
    };
    let context1 = contextCreator(test1);
    delete context1.invokedFunctionArn;
    index.handler({}, context1);
  });
});
