'use strict';
import assert from 'assert';
import index from '../index.js';
import contextCreator from './utils/mockContext.js';

describe('Test Handler', () => {
  it('Handler calls context.succeed with quote', done => {
    const test = (result) => {
      assert(result.length > 5);
      done();
    };
    const context = contextCreator(test);
    index.handler({}, context);
  });
  it('Handler calls context:fail with error when no functionARN specified', done => {
    const test = (error) => {
      console.log("Error", error);
      done();
    };
    const context = contextCreator(test);
    delete context.invokedFunctionArn;
    index.handler({}, {});
  });
});
