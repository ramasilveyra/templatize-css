/* eslint-disable no-console */
import yargs from 'yargs';
import chalk from 'chalk';
import ora from 'ora';
import { compileFile } from './index';
import pkg from '../package.json';

export default function templatizeCssCLI(argv) {
  console.log(chalk.bold.white(`${pkg.name} v${pkg.version}`));

  const parsedArgv = yargs(argv)
    .option('o', {
      alias: 'out-file',
      describe: 'Output file',
      type: 'string'
    })
    .usage(`${pkg.description}.\nUsage: $0 <file or dir> [options]`)
    .version()
    .alias('version', 'v')
    .help()
    .alias('help', 'h').argv;
  const file = parsedArgv._[0];
  const spinner = ora({ text: 'Processing...' });
  const progress = report => {
    spinner.stopAndPersist({ text: `${chalk.gray(report)}` });
  };

  if (file && parsedArgv.o) {
    spinner.start();
    return compileFile(file, parsedArgv.o, {
      progress
    })
      .then(() => {
        spinner.succeed(`${chalk.bold.green('success')} CSS templatized`);
      })
      .catch(err => {
        spinner.stopAndPersist();
        spinner.fail(`${chalk.bold.red('error')} ${err.stack}`);
        process.exit(1);
      });
  }

  return null;
}
