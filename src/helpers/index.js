const { exec } = require('child_process')

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
        console.log(`${endMsg} finished ✅`)
        resolve({ error, stdout, stderr })
      } else {
        console.log(`${stdout}\n${endMsg} finished ✅`)
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
    if (!stdout) console.log(`${endMsg} finished ✅`)
    else console.log(`${stdout}\n${endMsg} finished ✅`)
  })
}

function isObject(value) {
  return typeof value === 'object' && value.constructor === Object
}

function mergeObject(source, target) {
  Object.keys(source).map(key => {
    if (isObject(target[key]) && isObject(source[key])) {
      target[key] = { ...target[key], ...source[key] }

      return
    }
    if (Array.isArray(target[key]) && Array.isArray(source[key])) {
      target[key] = [...target[key], ...source[key]]

      return
    }
    target[key] = source[key]
  })
}

module.exports = {
  execCommand,
  execAsync,
  mergeObject,
}
