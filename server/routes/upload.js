/* eslint-disable no-unused-vars */

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const fs = require('fs');
const { tmpdir } = require('os');
const { sep } = require('path');

router.post('/', function (req, res, next) {
  // This should use the client generated ID
  const routeId = crypto.randomBytes(8).toString('hex');

  // Set filepath and create tempfolder
  const filePath = `${tmpdir()}${sep}${routeId}`;
  fs.mkdirSync(filePath, { recursive: true })

  // Create write stream for files
  // FIXME: Write stream requires filename. Maybe look onto Busboy, https://github.com/mscdex/busboy
  // var writeStream = fs.createWriteStream(`${filePath}${sep}SomeFileName.extention`)

  console.log(req)
  // req.pipe(writeStream)

  // Create download URL
  const downloadUrl = `${req.protocol}://${req.get('host')}/download/${routeId}`

  res.send(JSON.stringify(downloadUrl))
});

module.exports = router;
