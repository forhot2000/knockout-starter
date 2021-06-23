const gulp = require('gulp');
const uglify = require('gulp-uglify');
const newer = require('gulp-newer');
const debug = require('gulp-debug');
const browserify = require('./gulp-browserify');
const postfix = require('./gulp-postfix');

const entryFile = './src/index.ts';
const distDir = './dist';
const bundleFile = distDir + '/bundle.js';

function html() {
  return (
    gulp
      .src('./public/**')
      .pipe(newer(distDir))
      // .pipe(debug({ title: 'html:' }))
      .pipe(gulp.dest(distDir))
  );
}

function jsDebug() {
  return (
    gulp
      .src(entryFile)
      .pipe(browserify({ output: bundleFile }))
      // .pipe(debug({ title: 'jsDebug:' }))
      .pipe(gulp.dest('.'))
  );
}

function jsMin() {
  return (
    gulp
      .src(bundleFile)
      .pipe(uglify())
      .pipe(postfix('.min'))
      // .pipe(debug({ title: 'jsMin:' }))
      .pipe(gulp.dest(distDir))
  );
}

const js = gulp.series(jsDebug, jsMin);

const build = gulp.series(html, js);

exports.html = html;
exports.js = js;
exports.build = build;
exports.default = gulp.series(build);
