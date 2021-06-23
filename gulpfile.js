const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const newer = require('gulp-newer');
const debug = require('gulp-debug');
const browserify = require('./gulp-browserify');
const postfix = require('./gulp-postfix');

const entryFile = './src/index.ts';
const distDir = './dist';
const bundleFile = distDir + '/bundle.js';

function html() {
  return gulp
    .src('./public/**')
    .pipe(newer(distDir))
    .pipe(debug({ title: 'copy:' }))
    .pipe(gulp.dest(distDir));
}

function jsDebug() {
  return browserify(entryFile)
    .pipe(debug({ title: 'src:', showCount: false }))
    .pipe(rename(bundleFile))
    .pipe(debug({ title: 'dest:', showCount: false }))
    .pipe(gulp.dest('.'));
}

function jsMin() {
  return gulp
    .src(bundleFile)
    .pipe(sourcemaps.init())
    .pipe(uglify({ ie8: true }))
    .pipe(postfix('.min'))
    .pipe(debug({ title: 'uglify:', showCount: false }))
    .pipe(sourcemaps.write('.', { includeContent: false }))
    .pipe(gulp.dest(distDir));
}

const js = gulp.series(jsDebug, jsMin);

const build = gulp.series(html, js);

exports.html = html;
exports.js = js;
exports.build = build;
exports.default = gulp.series(build);
