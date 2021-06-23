const source = require('vinyl-source-stream');
const browserify = require('browserify');
const stringify = require('stringify');
const tsify = require('tsify');
const debug = require('./debug');

const MINIFY_OPTIONS = {
  removeComments: true,
  ignoreCustomComments: [/[\s\/]ko[\s]/], // keep ko comments
  removeCommentsFromCDATA: true,
  removeCDATASectionsFromCDATA: true,
  collapseWhitespace: true,
  conservativeCollapse: false,
  preserveLineBreaks: false,
  collapseBooleanAttributes: false,
  removeAttributeQuotes: true,
  removeRedundantAttributes: false,
  useShortDoctype: false,
  removeEmptyAttributes: false,
  removeScriptTypeAttributes: false,
  removeStyleLinkTypeAttributes: false,
  removeOptionalTags: false,
  removeIgnored: false,
  removeEmptyElements: false,
  lint: false,
  keepClosingSlash: false,
  caseSensitive: false,
  minifyJS: false,
  minifyCSS: false,
  minifyURLs: false
};

function gulpBrowserify(file) {
  const bundleStream = browserify()
    .plugin(tsify, { noImplicitAny: true })
    .transform(stringify, {
      appliesTo: { includeExtensions: ['.html'] },
      minify: true,
      minifyOptions: MINIFY_OPTIONS
    })
    .add(file) // main entry of an application
    .bundle();

  return bundleStream.pipe(source(file));
}

module.exports = gulpBrowserify;
