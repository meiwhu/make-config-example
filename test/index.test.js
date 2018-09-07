const childProcess = require('child_process');

const options = [
  '-i .env',
  '-V',
  '-h',
];

options.forEach(option => {
  describe('# make-config-example ' + option, () => {
    it('should succeed', () => {
      return new Promise((resolve, reject) => {
        childProcess.exec('node ../lib/index.js ' + option, { cwd: __dirname }, (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      })
    })
  })
})