const yargs = require('yargs')

const argv = yargs
  .option('VSCODE', {
    alias: 'vsc',
    description: 'Update .vscode settings',
    default: false,
    type: 'boolean',
  })
  .option('DEBUG', {
    alias: 'dbg',
    description: 'Debug mode',
    default: false,
    type: 'boolean',
  })
  .option('ESLINT', {
    alias: 'esl',
    description: 'Update .eslintrc.js settings',
    default: true,
    type: 'boolean',
  })
  .option('PRETTIER', {
    alias: 'ptr',
    description: 'Update .prettier.js settings',
    default: true,
    type: 'boolean',
  })
  .option('EDITOR', {
    alias: 'edt',
    description: 'Update .editorconfig settings',
    default: false,
    type: 'boolean',
  })
  .help()
  .alias('help', 'h')
  .showHelpOnFail(false, 'Specify --help for available options').argv

module.exports = argv
