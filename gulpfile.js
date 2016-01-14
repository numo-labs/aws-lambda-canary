var AWS = require('aws-sdk');
var gulp = require('gulp');
var zip = require('gulp-zip');
var install = require('gulp-install');
var runSequence = require('run-sequence');
var packageJson = require('./package.json');
var region = 'eu-west-1';

/**
 * Adds the project files to the archive folder.
 */
gulp.task('js', function () {
  return gulp.src('index.js')
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
    .pipe(zip(packageJson.name + '.zip'))
    .pipe(gulp.dest('./'));
});

/**
 *  Upload the archive to S3 bucket (numo-labs-lambda/{packageJson.name})
 */
gulp.task('upload', function() {
  AWS.config.region = region;
  var s3 = new AWS.S3();
  var params = {
    Bucket: 'numo-labs-lambda/' + packageJson.name,
    Key: packageJson.name + '.zip'
  }

  s3.putObject(params, function (err, data) {
    if (err) throw err;
    else console.log('Uploaded ' + packageJson.name + '.zip to s3');
  })
});

gulp.task('deploy', function (callback) {
  return runSequence(
    ['js', 'node-mods'],
    ['zip'],
    ['upload'],
    callback
  );
});
