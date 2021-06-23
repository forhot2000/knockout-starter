#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const shell = require('shelljs');

// console.log("dev ops!");
// console.log(__dirname);

yargs(hideBin(process.argv))
  .command(
    'test',
    '',
    (yargs) => yargs,
    (argv) => {
      shell.exec(`node_modules/.bin/jest -c ${__dirname}/jest.config.js --rootDir . --color`);
    }
  )
  .command(
    'build',
    '',
    (yargs) => yargs,
    (argv) => {
      shell.exec(`node_modules/.bin/gulp -f ${__dirname}/gulpfile.js --cwd .  --color build`);
    }
  )
  .command(
    'clear',
    '',
    (yargs) => yargs,
    (argv) => {
      shell.exec(`node_modules/.bin/rimraf dist`);
    }
  )
  .command(
    'start',
    '',
    (yargs) => yargs,
    (argv) => {
      shell.exec(`node_modules/.bin/serve dist`);
    }
  )
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
  })
  .alias('help', 'h').argv;
