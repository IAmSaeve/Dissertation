const express = require('express');
const path = require('path');
const logger = require('morgan');

const uploadRouter = require('./routes/upload');
const downloadRouter = require('./routes/download');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/upload', uploadRouter);
app.use('/download', downloadRouter);
app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

module.exports = app;
