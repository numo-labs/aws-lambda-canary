var AWS = require('aws-sdk');
var gulp = require('gulp');
var zip = require('gulp-zip');
var install = require('gulp-install');
var runSequence = require('run-sequence');
var packageJson = require('./package.json');
var region = 'eu-west-1';
var fs = require('fs');

var functionName = packageJson.name;
var outputName = packageJson.name + '.zip';

/**
 * Adds the project files to the archive folder.
 */
gulp.task('js', function () {
  return gulp.src(['index.js', 'script/'])
    .pipe(gulp.dest('dist/'));
});

/**
 * This task will copy all the required dependencies to
 * the dist folder.
 */
gulp.task('node-mods', function () {
  return gulp.src('./package.json')
    .pipe(gulp.dest('dist/'))
    .pipe(install({production: true}));
});

/**
 * Create an archive based on the dest folder.
 */
gulp.task('zip', function () {
  return gulp.src(['dist/**/*', '!dist/package.json'])
    .pipe(zip(outputName))
    .pipe(gulp.dest('./'));
});

/**
 *  update or create the lambda functon
 */
gulp.task('upload', function() {
  AWS.config.region = region;
  var lambda = new AWS.Lambda();
  var zipFile = './' + outputName;

  lambda.getFunction({ FunctionName: functionName }, function(err, data) {
    if (err) createFunction();
    else updateFunction();
  });

  function createFunction () {

    getZipFile(function (data) {
      var params = {
        Code: {
          ZipFile: data
        },
        FunctionName: functionName,
        Handler: 'index.handler',
        Role: 'arn:aws:iam::847002989232:role/lambdafull',
        Runtime: 'nodejs'
      };

      lambda.createFunction (params, function (err, data) {
        if (err) console.error(err);
        else console.log('Function ' + functionName + ' has been created.');
      });
    });

  }

  function updateFunction () {

    getZipFile(function (data) {
      var params = {
        FunctionName: functionName,
        ZipFile: data
      };

      lambda.updateFunctionCode(params, function(err, data) {
        if (err) console.error(err);
        else console.log('Function ' + functionName + ' has been updated.');
      });
    });
  }

  function getZipFile (next) {
    fs.readFile(zipFile, function (err, data) {
          if (err) console.log(err);
          else {
            next(data);
          }
    });
  }

});

gulp.task('deploy', function (callback) {
  return runSequence(
    ['js', 'node-mods'],
    ['zip'],
    ['upload'],
    callback
  );
});
