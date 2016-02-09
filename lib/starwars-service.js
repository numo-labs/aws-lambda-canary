var starwars = require('starwars');

exports.quote = function (isHuman, cb) {
  if (isHuman) {
    cb(null, starwars());
  } else {
    cb("Sorry you're not a human");
  }
};
