const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const fs = require('fs');
const { tmpdir } = require('os');
const { sep } = require('path');
const Busboy = require('busboy');

// TODO: Extract busboy to separate file handler
// TODO: Add error handling to busboy file writing
router.post('/', (req, res, next) => {
  const busboy = new Busboy({ headers: req.headers });
  const routeId = crypto.randomBytes(8).toString('hex');
  const downloadUrl = `${req.protocol}://${req.get('host')}/download/${routeId}`
  const dir = `${tmpdir()}${sep}${routeId}`;

  fs.mkdirSync(dir, { recursive: true })

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    file.pipe(fs.createWriteStream(`${dir}${sep}${filename}`));
  });

  busboy.on('finish', () => {
    res.writeHead(200, { 'Connection': 'close' }).end(downloadUrl);
  });

  return req.pipe(busboy);
});

module.exports = router;
