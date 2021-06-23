const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const browserify = require('./gulp-browserify');
const debug = require('./debug');

function html() {
  return gulp.src('./public/**').pipe(gulp.dest('./dist'));
}

function jsDebug() {
  return gulp.src('./src/index.ts', { base: '.' }).pipe(browserify()).pipe(gulp.dest('./dist'));
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
