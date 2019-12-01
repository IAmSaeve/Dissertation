const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const fs = require('fs');
const { tmpdir } = require('os');
const { sep } = require('path');
const multer = require('multer')

var routeId = "";

// FIXME: Create only one folder per request
let storage = multer.diskStorage({
  // pass function that will generate destination path
  destination: (req, file, cb) => {
    routeId = crypto.randomBytes(8).toString('hex');
    const filePath = `${tmpdir()}${sep}${routeId}`;
    fs.mkdirSync(filePath, { recursive: true })
    console.log('DEST', filePath)
    console.log('FILE', file.originalname)
    cb(
      null,
      filePath
    );
  },
  // pass function that may generate unique filename if needed
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname
    );
  }
});

let upload = multer({ storage: storage })

// TODO: Maybe clear id after response
router.post('/', upload.any(), function (req, res, next) {
  // Create download URL
  const downloadUrl = `${req.protocol}://${req.get('host')}/download/${routeId}`

  res.json(downloadUrl)
});

module.exports = router;
