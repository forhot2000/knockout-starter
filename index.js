#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const handler = require('serve-handler');
const http = require('http');
const shell = require('shelljs');
const shellEncode = require('shell-encode');
const npmRunPath = require('npm-run-path');
const debug = require('./debug');

// console.log("dev ops!");
// debug(__dirname);

// const runPath = npmRunPath();
// debug('runPath:', runPath);
// shell.env['path'] = runPath;

yargs(hideBin(process.argv))
  .strictCommands()
  .command(
    'build',
    '',
    (yargs) => yargs,
    (argv) => {
      // pass all args to gulp
      const args = process.argv.slice(3);
      const cwd = process.cwd();
      const gulpfile = `${__dirname}/gulpfile.js`;
      const script = shellEncode('gulp', '-f', gulpfile, '--cwd', cwd, '--color', ...args);
      debug(script);
      shell.exec(script);
    }
  )
  .command(
    'start',
    '',
    (yargs) => {
      return yargs.strict().option('port', { alias: 'p', type: 'number' });
    },
    (argv) => {
      const server = http.createServer((request, response) => {
        // You pass two more arguments for config and middleware
        // More details here: https://github.com/vercel/serve-handler#options
        return handler(request, response, { public: 'dist' });
      });

      const { port = 5000 } = argv;
      server.listen(port, () => {
        console.log(`Running at http://localhost:${port}`);
      });
    }
  )
  .demandCommand()
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
  })
  .alias('help', 'h').argv;
