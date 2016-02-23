var starwars = require('starwars');

exports.quote = function (isHuman, cb) {
  if (isHuman) {
    cb(null, starwars());
  } else {
    cb("Sorry, these are not the quotes you're looking for.");
  }
};
