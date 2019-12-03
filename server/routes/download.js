const express = require('express');
const router = express.Router();
const { tmpdir } = require('os');
const { sep } = require('path');
const archiver = require('archiver');

// FIXME: Don't respond to requst if folder does not exist
router.get('/:id', function (req, res, next) {
  const id = req.params.id;
  const dir = `${tmpdir()}${sep}${id}`;

  var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  res.setHeader('Content-Type', 'application/zip');
  res.attachment(`${id}.zip`);

  archive.directory(`${dir}${sep}`, false);
  archive.pipe(res);

  archive.finalize();
});

module.exports = router;