const fs = require('fs')
const params = process.argv

const targetPath = process.env.PWD
const mainPath = params[1]
const { execAsync, updateJSFile, copyConfig } = require('./helpers')
const argv = require('./helpers/cli-args')
const pathConfig = { mainPath, targetPath }

if (argv.debug) console.log(argv)

function updateDependencies() {
  return new Promise((resolve, reject) => {
    const pkgMainPath = `${mainPath}/files/package.json`
    const pkgTargetPath = `${targetPath}/package.json`
    const pkgMainFile = JSON.parse(fs.readFileSync(pkgMainPath))
    const pkgTargetFile = JSON.parse(fs.readFileSync(pkgTargetPath))
    console.log('🕛 Updating dependencies...')
    if (pkgTargetFile) {
      if (!pkgTargetFile.devDependencies)
        pkgTargetFile.devDependencies = pkgMainFile.devDependencies
      else
        pkgTargetFile.devDependencies = {
          ...pkgTargetFile.devDependencies,
          ...pkgMainFile.devDependencies,
        }
    }

    fs.writeFile(
      pkgTargetPath,
      new Buffer.from(`${JSON.stringify(pkgTargetFile, null, 2)}\n`),
      err => {
        if (err) {
          const errMsg = `❌ ${err}`
          console.log(errMsg)
          reject(errMsg)
        }
        const msg = '✔ Update dependecies finished successfully'
        console.log(msg)
        resolve(msg)
      },
    )
  })
}

async function main() {
  console.log('🚀 Start updating...')

  copyConfig(argv.vscode, '.vscode', '.vscode', pathConfig)
  copyConfig(argv.editor, '.editorconfig', '.editorconfig', pathConfig)
  await updateDependencies()
  await updateJSFile(argv.eslint, '.eslintrc.js', 'Eslint', pathConfig)
  await updateJSFile(argv.prettier, '.prettierrc.js', 'Prettier', pathConfig)
  await execAsync(
    'rm -rf node_modules',
    '🕛 Removing node_modules...',
    'Remove node_modules',
  )
  await execAsync(
    'yarn',
    '🕛 Installing dependencies...',
    'Install dependencies',
  )
  await execAsync(
    `yarn prettier-eslint --write ${targetPath}/.*.js`,
    '🕛 Formating files',
    'Format files',
  )
}

main()
