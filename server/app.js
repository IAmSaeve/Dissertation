const express = require('express');
const logger = require('morgan');
const cors = require('cors');

// Import routes
const uploadRouter = require('./routes/upload');
const downloadRouter = require('./routes/download');
// const ws = require('./routes/ws');

const app = express();

// Middleware
app.use(logger('dev'));
app.use(cors({ origin: true }));

// Register routes
app.use('/upload', uploadRouter);
app.use('/download', downloadRouter);
// app.use('/ws', ws);

// const WebSocket = require('ws');
// var server = require('./bin/www');
// const wss = new WebSocket.Server({server: server, path: '/ws'});
 
// wss.on('connection', function connection(ws) {
//   const duplex = WebSocket.createWebSocketStream(ws, { encoding: 'utf8' });
//   duplex.on('data', d => console.log(d));
// });

module.exports = app;
