const express = require('express');
const router = express.Router();
const { tmpdir } = require('os');
const { sep } = require('path');
const fs = require('fs');

// FIXME: Don't respond to requst if folder does not exist
router.post('/:id', async function (req, res, next) {
  const id = req.params.id;
  const dir = `${tmpdir()}${sep}${id}`;

  fs.readdir(dir, (err, files) => {
      var fileName;
      res.setHeader('Access-Control-Expose-Headers', ['content-disposition', 'x-authtag']);
      for (let index = 0; index < files.length; index++) {
        if(files[index]==='auth.json'){
          const auth = JSON.parse(fs.readFileSync(dir+sep+files[index]));
          res.setHeader('x-authtag', JSON.stringify(auth.authTag.data));
        }else{
          fileName=files[index];
          res.attachment(files[index]);
        }
      }
      
      var file = fs.createReadStream(dir+sep+fileName);
      file.pipe(res);
  });

});

module.exports = router;