const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const expressWs = require('express-ws');

// Import routes
const downloadRouter = require('./routes/download');
const ws = require('./routes/ws');

const app = express();
expressWs(app, null, { perMessageDeflate: false });

// Middleware
app.use(logger('dev'));
app.use(cors({ origin: true }));

// Register routes
app.use('/download', downloadRouter);
app.ws('/ws', ws);

module.exports = app;
