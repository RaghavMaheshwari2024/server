const fs = require('fs')


const connectionlogPath = path.join(__dirname, '..', 'logs', 'connectionLogs.txt');

export async function logConnection(msg) {
  fs.appendFileSync(connectionlogPath,`[${new Date().toISOString()}] Client connected from ${msg}\n`);

}
