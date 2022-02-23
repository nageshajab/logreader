const fs = require('fs');
const readline = require('readline');
const logManager = require('../dal/logManager');

async function processLineByLine(filename, hostname, servicename) {
  console.log(`processing file ${filename}`);
  const fileStream = fs.createReadStream(filename);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    // console.log(`Line from file: ${line}`);
    logManager.saveData('dt', hostname, servicename, 'ms', line);
  }
}

module.exports = processLineByLine;