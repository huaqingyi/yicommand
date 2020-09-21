#!/usr/bin/env node

// const commander = require('commander'); // (normal include)
import commander from 'commander'; // include commander in git clone of commander repo

// Override createCommand directly to customise subcommands,
// in this example by adding --debug option.

const program = commander.createCommand();

// // Customise subcommand creation
// program.createCommand = (name) => {
//   const cmd = commander.createCommand(name);
//   cmd.option('-d,--debug', 'output options');
//   return cmd;
// };

// program
//   .command('serve')
//   .option('--port <port-number>', 'specify port number', '80')
//   .action((cmd) => {
//     if (cmd.debug) {
//       console.log('Options:');
//       console.log(cmd.opts());
//       console.log();
//     }

//     console.log(`Start serve on port ${cmd.port}`);
//   });

program.version('1.0.1');

const test = program.command('test');
test.option('-C, --chdir <path>', 'change the working directory');
test.option('-c, --config <path>', 'set config path. defaults to ./deploy.conf');
test.option('-T, --tt [tt]', 'ignore test hook');
test.action((config) => {
  console.log('brew tea', config);
});

test.option('-C, --chdir <path>', 'change the working directory');
test.option('-c, --config <path>', 'set config path. defaults to ./deploy.conf');
test.option('-T, --tt [tt]', 'ignore test hook');
test.addCommand(program.command('tete').option('-e, --eee', 'erererer').action(async () => {
  console.log(1111);
}));

const test1 = program.command('test1');
test1.option('-C, --chdir <path>', 'change the working directory');
test1.option('-c, --config <path>', 'set config path. defaults to ./deploy.conf');
test1.option('-T, --tt [tt]', 'ignore test hook');
test1.option('-F, --ff [tt]', 'ignore test hook');
test1.action((config) => {
  console.log('brew tea', config);
});

program.addCommand(test).addCommand(test1);

program.parse(process.argv);
