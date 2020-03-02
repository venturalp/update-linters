const { exec } = require('child_process')

module.exports = {
  execCommand: function(command, msg) {
    return new Promise((resolve, reject) => {
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
          console.log(`${msg} finished ✅`)
        } else {
          console.log(`${stdout}\n${msg} finished ✅`)
        }
        resolve({ error, stdout, stderr })
      })
    })
  },
}
