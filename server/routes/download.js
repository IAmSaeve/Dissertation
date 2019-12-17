const express = require('express');
const router = express.Router();
const { tmpdir } = require('os');
const { sep } = require('path');
// TODO: Should probably use zlib module
const archiver = require('archiver');

// FIXME: Don't respond to requst if folder does not exist
router.post('/:id', function (req, res, next) {
  const id = req.params.id;
  const dir = `${tmpdir()}${sep}${id}`;

  var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  // CORS header to allow browsers to read file type and name from header
  res.setHeader('Access-Control-Expose-Headers', 'content-disposition');
  res.contentType('application/zip');
  res.attachment(`${id}.zip`);

  archive.directory(`${dir}${sep}`, false);
  archive.pipe(res);

  archive.finalize();
});

module.exports = router;