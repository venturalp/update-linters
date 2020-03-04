const fs = require('fs')
const params = process.argv

const targetPath = process.env.PWD
const mainPath = params[1]
const { execAsync, updateJSFile } = require('./helpers')
const ncp = require('ncp').ncp
const argv = require('./helpers/cli-args')
const pathConfig = { mainPath, targetPath }

if (argv.debug) console.log(argv)

/**
 * Treat .vscode option
 * @param {Boolean} flag flag to define if it whether to copy .vscode settings or not
 */
function vscodeUpdate(flag) {
  if (!flag) return
  console.log('🕛 Copying .vscode settings...')
  new Promise((resolve, reject) => {
    ncp(`${mainPath}/files/.vscode`, `${targetPath}/.vscode`, err => {
      if (err) reject(`❌ Failed to copy .vscode settings\n${err}`)
      else resolve('✅ .vscode settings copied successfully')
    })
  })
    .then(value => console.log(`${value}`))
    .catch(err => console.log(`${err}`))
}

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
        const msg = '✅ Update dependecies finished successfully'
        console.log(msg)
        resolve(msg)
      },
    )
  })
}

async function main() {
  console.log('🚀 Start updating...')

  vscodeUpdate(argv.vscode)
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
