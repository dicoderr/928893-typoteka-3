'use strict';

const {Cli} = require(`./cli`);
const {ExitCode} = require(`../constants`);

const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;

const args = process.argv.slice(USER_ARGV_INDEX);
const [cmd] = args;

if (args.length === 0 || !Cli[cmd]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

Cli[cmd].run(args.slice(1));
