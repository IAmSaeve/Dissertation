const express = require('express');
const logger = require('morgan');
const cors = require('cors');

// Import routes
const uploadRouter = require('./routes/upload');
const downloadRouter = require('./routes/download');

const app = express();

// Middleware
app.use(logger('dev'));
app.use(cors({ origin: false }));

// Register routes
app.use('/upload', uploadRouter);
app.use('/download', downloadRouter);


module.exports = app;
