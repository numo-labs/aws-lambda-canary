module.exports = function (cb) {
  return {
    succeed: function (result) {
      console.log('succeed: ' + result);
      return cb(result);
    },
    fail: function (error) {
      console.log('fail: ' + error);
      return cb(error);
    },
    done: function (result) {
      return cb(result);
    },
    functionName: 'LambdaTest',
    functionVersion: 1,
    invokedFunctionArn: 'arn:aws:lambda:eu-west-1:655240711487:function:LambdaTest:ci'
  };
};
