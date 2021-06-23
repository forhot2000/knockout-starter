const rename = require('gulp-rename');
const debug = require('./debug');

function postfix(value) {
  return rename(function (path) {
    // debug('rename:', path);
    path.basename += value;
  });
}

module.exports = postfix;
