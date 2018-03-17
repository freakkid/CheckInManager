#!/usr/bin/env node

import app from '../app';
import http from 'http';
import process from 'process';

import { port as defaultPort } from '../config';
import { logger } from '../utils';

var port = normalizePort(process.env.PORT || defaultPort);

app.listen(port);


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