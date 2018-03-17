#!/usr/bin/env node

import app from '../app';
// import debug from ('debug')('another:server');
import http from 'http';
import process from 'process';

import { initDatabaseAsync } from '../models';
import { defaultPort } from '../config';

// initial database when starts server;
initDatabaseAsync();


let port = normalizePort(process.env.PORT || defaultPort);
app.set('port', port);

let server = http.createServer(app);
server.listen(port);
server.on('error', onError);
// server.on('listening', onListening);

function normalizePort(val) {
  let port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // let bind = typeof port === 'string'
  //   ? 'Pipe ' + port
  //   : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      // console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      // console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// function onListening() {
//   let addr = server.address();
//   let bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//   // debug('Listening on ' + bind);
// }