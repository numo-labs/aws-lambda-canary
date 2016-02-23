process.env.region = 'eu-west-1';
var AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';
var lambda = new AWS.Lambda();
lambda.listFunctions({MaxItems: 30}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    console.log(data.Functions.length);
  }
});
