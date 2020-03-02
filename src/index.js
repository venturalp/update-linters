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

console.log('🚀 Starting update')

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

exec('rm -rf node_modules', (error, stdout, stderr) => {
  console.log('Removing node_modules...')
  if (error) {
    console.log(`error: ${error.message}`)
    return
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`)
    return
  }
  if (!stdout) {
    console.log('node_modules removed')
  } else {
    console.log(`node_modules removed\n${stdout}`)
  }
})

exec('yarn', (error, stdout, stderr) => {
  console.log('Installing dependencies...')
  if (error) {
    console.log(`error: ${error.message}`)
    return
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`)
    return
  }
  console.log(`stdout: ${stdout}`)
})
