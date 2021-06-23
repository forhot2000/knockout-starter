const path = require('path');
const Vinyl = require('vinyl');
const through = require('through2');
const browserify = require('browserify');
const tsify = require('tsify');
const debug = require('./debug');

function gulpBrowserify() {
  return through.obj(function (file, _, cb) {
    // debug vinyl file info
    // debug('gulp-browserify:', {
    //   path: file.path,
    //   base: file.base,
    //   relative: file.relative,
    //   basename: file.basename
    // });

    // debug get relative path
    const _base = process.cwd();
    const _relative = path.relative(_base, file.path);
    // debug('relative:', { base: _base, relative: _relative });
    debug('gulp-browserify:', _relative);

    const bundle = browserify()
      .add(_relative) // main entry of an application
      .plugin(tsify, { noImplicitAny: true })
      .bundle();

    const transformed = new Vinyl({ path: 'bundle.js', contents: bundle });
    // debug('transformed:', {
    //   path: transformed.path,
    //   base: transformed.base,
    //   relative: transformed.relative,
    //   basename: transformed.basename
    // });

    cb(null, transformed);
  });
}

module.exports = gulpBrowserify;
