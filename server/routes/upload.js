const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const fs = require('fs');
const { tmpdir } = require('os');
const { sep } = require('path');

// TODO: Add error handling to busboy file writing
router.post('/', (req, res, next) => {
  const routeId = crypto.randomBytes(8).toString('hex');
  const downloadUrl = `${req.protocol}://${req.get('host')}/download/${routeId}`;
  const dir = `${tmpdir()}${sep}${routeId}`;
  fs.mkdirSync(dir, { recursive: true });

  req.pipe(fs.createWriteStream(`${dir}${sep}${req.headers['content-disposition']}`));

  res.set('Connection', 'close');
  res.send(downloadUrl);
});


module.exports = router;
