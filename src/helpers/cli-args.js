const yargs = require('yargs')

const argv = yargs
  .option('VSCODE', {
    alias: 'vsc',
    description: 'Update .vscode settings',
    default: false,
    type: 'boolean',
  })
  .option('ESLINT', {
    alias: 'esl',
    description: 'Update .eslintrc.js settings',
    default: true,
    type: 'boolean',
  })
  .help()
  .alias('help', 'h')
  .showHelpOnFail(false, 'Specify --help for available options').argv

module.exports = argv
