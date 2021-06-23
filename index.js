#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const handler = require('serve-handler');
const http = require('http');
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
      const server = http.createServer((request, response) => {
        // You pass two more arguments for config and middleware
        // More details here: https://github.com/vercel/serve-handler#options
        return handler(request, response, { public: 'dist' });
      });

      server.listen(3000, () => {
        console.log('Running at http://localhost:3000');
      });
    }
  )
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
  })
  .alias('help', 'h').argv;
