// #!/usr/bin/env node

// import 'ts-node/register'
// import program from 'commander'
// import colors from 'colors'
// import figlet from 'figlet'
// import _ from 'lodash'
// import path from 'path'

// colors.setTheme({
//     silly: 'rainbow',
//     input: 'grey',
//     verbose: 'cyan',
//     prompt: 'red',
//     info: 'green',
//     data: 'blue',
//     help: 'cyan',
//     warn: 'yellow',
//     debug: 'magenta',
//     error: 'red'
// });

// figlet('Yicwler Server', (err, data) => {
//     if (err) {
//         console.log('Something went wrong...'.error);
//         console.dir(err);
//     } else {
//         console.log((<string>data).red);
//         const root = process.cwd();
//         const version = require('../package.json').version;
//         program.version(version);
//         program.option(`-v, --version`, `show Yicwler version`);
//         program.option(`-c, --curl [(http|https)//:*]`, `default root url .`);

//         program.parse(process.argv);

//         return Promise.resolve(null)
//             .then(resp => {
//                 if (program.curl) {
//                     console.log(program.curl);
//                 }
//             });
//     }
// })

export * from './decorators';