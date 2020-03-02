const fs = require('fs')
const params = process.argv
const path = require('path')

const targetPath = process.env.PWD
const mainPath = params[1]
const pkgMainPath = `${mainPath}/files/package.json`
const pkgTargetPath = `${targetPath}/package.json`
const pkgMainFile = JSON.parse(fs.readFileSync(pkgMainPath))
const pkgTargetFile = JSON.parse(fs.readFileSync(pkgTargetPath))
const { execCommand } = require('./helpers')
const yargs = require('yargs')

const argv = yargs
  .option('VSCODE', {
    alias: 'vsc',
    description: 'Update .vscode configs',
    default: false,
    type: 'boolean',
  })
  .help()
  .alias('help', 'h')
  .showHelpOnFail(false, 'Specify --help for available options').argv
console.log(argv)
// if (argv.vscode) {
//   console.log('vscode true')
// }

console.log('🚀 Start updating...')

if (pkgTargetFile && !pkgTargetFile.devDependencies) {
  pkgTargetFile.devDependencies = pkgMainFile.devDependencies
}

fs.writeFile(
  pkgTargetPath,
  new Buffer.from(`${JSON.stringify(pkgTargetFile, null, 2)}\n`),
  (err, data) => {
    if (err) console.log(err)
  },
)

async function main() {
  console.log('🕛 Removing node_modules...')
  const removeFiles = await execCommand(
    'rm -rf node_modules',
    'Remove node_modules',
  )
  console.log('🕛 Installing dependencies...')
  const installDependencies = await execCommand('yarn', 'Install dependencies')
}

main()
