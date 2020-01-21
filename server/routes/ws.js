const WebSocket = require('ws');
const crypto = require('crypto');
const fs = require('fs');
const { tmpdir } = require('os');
const { sep } = require('path');
const { Transform } = require('stream');

// TODO: Progress
module.exports = function (ws, req) {
  const routeId = crypto.randomBytes(8).toString('hex');
  const dir = `${tmpdir()}${sep}${routeId}`;
  const downloadUrl = `${req.protocol}://${req.get('host')}/download/${routeId}`;
  const duplex = WebSocket.createWebSocketStream(ws);
  fs.mkdirSync(dir, { recursive: true });
  var fileName = '';

  const eof = new Transform({
    transform: function (chunk, encoding, callback) {
      // TODO: Try catch
      if (chunk.toString().includes('fileName')) {
        fileName = JSON.parse(chunk.toString()).fileName;
        this.emit('name', fileName);
      } else {
        this.push(chunk);
      }
      callback();
    }
  });

  ws.on('close', () => { console.log('done'); ws.terminate(); });

  eof.on('name', n => {
    eof.pipe(fs.createWriteStream(`${dir}${sep}${n}`));
    ws.send(downloadUrl);
  });

  duplex.pipe(eof);
};