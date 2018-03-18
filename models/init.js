import sqlite3 from 'sqlite3';
import process from 'process';

import { dbPath } from '../config';
import { logger } from '../utils';

export const db = new sqlite3.Database(dbPath, OPEN_READWRITE | OPEN_CREATE, function (err) {
  if (err) {
    logger.error(err);
    process.exit(1);
  } else {
    logger.info('Created database.');
  }
});

// const

function test() {
  return new Promise((resolve, reject) => {
    db.run('', )
  })
}
