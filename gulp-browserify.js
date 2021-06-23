const path = require('path');
const Vinyl = require('vinyl');
const through = require('through2');
const browserify = require('browserify');
const tsify = require('tsify');
const debug = require('./debug');

function gulpBrowserify(opts) {
  opts = Object.assign({ output: './dist/bundle.js' }, opts);
  const { output } = opts;

  return through.obj(function (file, _, cb) {
    const _base = process.cwd();
    const _relative = path.relative(_base, file.path);
    // debug('gulp-browserify:', _relative);

    const bundle = browserify()
      .add(_relative) // main entry of an application
      .plugin(tsify, { noImplicitAny: true })
      .bundle();

    const transformed = new Vinyl({ path: output, contents: bundle });
    cb(null, transformed);
  });
}

module.exports = gulpBrowserify;
