const path = require('path');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const Vinyl = require('vinyl');
const through = require('through2');
const browserify = require('browserify');
const tsify = require('tsify');
const debug = require('debug')('knockout-starter');

function html() {
  return gulp.src('./public/**').pipe(gulp.dest('./dist'));
}

function _browserify() {
  return through.obj(function (file, _, cb) {
    // debug vinyl file info
    debug('browserify:', {
      path: file.path,
      base: file.base,
      relative: file.relative,
      basename: file.basename
    });

    // debug get relative path
    const _base = process.cwd();
    const _relative = path.relative(_base, file.path);
    debug('relative:', { base: _base, relative: _relative });

    const bundle = browserify()
      .add(_relative) // main entry of an application
      .plugin(tsify, { noImplicitAny: true })
      .bundle();

    const transformed = new Vinyl({ path: 'bundle.js', contents: bundle });
    debug('transformed:', {
      path: transformed.path,
      base: transformed.base,
      relative: transformed.relative,
      basename: transformed.basename
    });

    cb(null, transformed);
  });
}

function jsDebug() {
  return gulp.src('./src/index.ts', { base: '.' }).pipe(_browserify()).pipe(gulp.dest('./dist'));
}

function jsMin() {
  return gulp.src('./dist/bundle.js').pipe(uglify()).pipe(rename('bundle.min.js')).pipe(gulp.dest('./dist'));
}

const js = gulp.series(jsDebug, jsMin);

const build = gulp.series(html, js);

exports.html = html;
exports.js = js;
exports.build = build;
exports.default = gulp.series(build);
