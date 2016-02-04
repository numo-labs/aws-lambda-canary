var starwars = require('starwars');

exports.quote = function (cb) {
  cb(null, starwars());
};
