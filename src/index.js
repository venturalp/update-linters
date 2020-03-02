const fs = require('fs')
const params = process.argv
const path = require('path')
const { exec } = require('child_process')

const targetPath = process.env.PWD
const mainPath = params[1]
const pkgMainPath = `${mainPath}/files/package.json`
const pkgTargetPath = `${targetPath}/package.json`
const pkgMainFile = JSON.parse(fs.readFileSync(pkgMainPath))
const pkgTargetFile = JSON.parse(fs.readFileSync(pkgTargetPath))

console.log('🚀 Start updating...')

if (pkgTargetFile && !pkgTargetFile.devDependencies) {
  pkgTargetFile.devDependencies = pkgMainFile.devDependencies
}

fs.writeFile(
  pkgTargetPath,
  new Buffer.from(JSON.stringify(pkgTargetFile, null, 2)),
  (err, data) => {
    if (err) console.log(err)
  },
)

function execCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(`❌ error: ${error.message}`)
        reject({ error, stdout, stderr })
        return
      }
      if (stderr) {
        console.log(`⚠️ stderr: ${stderr}`)
        reject({ error, stdout, stderr })
        return
      }
      if (!stdout) {
        console.log('node_modules removed ✅')
      } else {
        console.log(`node_modules removed ✅\n${stdout}`)
      }
      resolve({ error, stdout, stderr })
    })
  })
}

async function main() {
  console.log('🕛 Removing node_modules...')
  const removeFiles = await execCommand('rm -rf node_modules')
  console.log('🕛 Installing dependencies...')
  const installDependencies = await execCommand('yarn')
}

main()
