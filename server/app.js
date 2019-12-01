const express = require('express');
const logger = require('morgan');
const cors = require('cors')

const uploadRouter = require('./routes/upload');
const downloadRouter = require('./routes/download');

const app = express();

app.use(logger('dev'));
app.use(cors({ origin: false }))

app.use('/upload', uploadRouter);
app.use('/download', downloadRouter);


module.exports = app;
