const { exec } = require('child_process')
const fs = require('fs')

function execAsync(command, startMsg, endMsg) {
  return new Promise((resolve, reject) => {
    console.log(startMsg)
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(`❌ error: ${error.message}`)
        reject({ error, stdout, stderr })

        return
      }
      if (stderr) {
        console.log(`⚠️ stderr: ${stderr}`)
      }
      if (!stdout) {
        console.log(`✅ ${endMsg} finished`)
        resolve({ error, stdout, stderr })
      } else {
        console.log(`${stdout}\n✅ ${endMsg} finished`)
        resolve({ error, stdout, stderr })
      }
    })
  })
}

function execCommand(command, startMsg, endMsg) {
  console.log(startMsg)
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`❌ error: ${error.message}`)

      return
    }
    if (stderr) console.log(`⚠️ stderr: ${stderr}`)
    if (!stdout) console.log(`✅ ${endMsg} finished`)
    else console.log(`${stdout}\n✅ ${endMsg} finished`)
  })
}

function isObject(value) {
  return typeof value === 'object' && value.constructor === Object
}

function mergeObject(source, target) {
  Object.keys(source).map(key => {
    if (isObject(target[key]) && isObject(source[key])) {
      target[key] = { ...target[key], ...source[key] }

      return target[key]
    }
    if (Array.isArray(target[key]) && Array.isArray(source[key])) {
      target[key] = [...new Set([...target[key], ...source[key]])]

      return target[key]
    }

    if (Array.isArray(target[key]) && !Array.isArray(source[key])) {
      target[key] = [...new Set(target[key].concat(source[key]))]

      return
    }

    if (!Array.isArray(target[key]) && Array.isArray(source[key])) {
      target[key] = [...new Set(source[key].concat(target[key]))]

      return
    }
  })

  return target
}

function readJS(path) {
  return new Promise(resolve => {
    try {
      const file = require(path)
      resolve(file)
    } catch (err) {
      resolve(err)
    }
  })
}

async function updateJSFile(flag, fileSource, msgLog, config) {
  if (!flag) return

  return new Promise(async (resolve, reject) => {
    const eslMainPath = `${config.mainPath}/files/${fileSource}`
    const eslTargetPath = `${config.targetPath}/${fileSource}`
    const eslMainFile = await readJS(eslMainPath)
    const eslTargetFile = await readJS(eslTargetPath)
    let eslintUpdated = {}

    if (eslMainFile.code && eslMainFile.code === 'MODULE_NOT_FOUND') {
      console.log(`❌ ${msgLog} source file not found`)

      return
    }
    console.log(`🕛 Updating ${msgLog} settings...`)
    if (eslTargetFile.code && eslTargetFile.code === 'MODULE_NOT_FOUND') {
      eslintUpdated = eslMainFile
    } else {
      eslintUpdated = mergeObject(eslMainFile, eslTargetFile)
    }

    fs.writeFile(
      eslTargetPath,
      new Buffer.from(
        `module.exports = ${JSON.stringify(eslintUpdated, null, 2)}\n`,
      ),
      err => {
        if (err) {
          const errMsg = `❌ Error on update ${msgLog} settings\n${err}`
          console.log(errMsg)
          reject(errMsg)
        }
        const msg = `✅ Update ${msgLog} settings finished successfully`
        console.log(msg)
        resolve(msg)
      },
    )
  })
}

module.exports = {
  execCommand,
  execAsync,
  mergeObject,
  updateJSFile,
}
