const childProcess = require('child_process');

const options = [
  '-i .env',
  '-i config.json',
  '-V',
  '-h',
];

options.forEach(option => {
  describe('# make-config-example ' + option, () => {
    it('should succeed', () => {
      childProcess.execSync('node ../lib/index.js ' + option, { cwd: __dirname })
    })
  })
})