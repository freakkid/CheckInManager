import log4js from 'log4js';
import { logFileName } from '../config';
import { twelveBitsRandomID, sixteenBitsRandomID } from './randomID';

export { twelveBitsRandomID, sixteenBitsRandomID };

log4js.configure({
  appenders: {
    errors: { type: 'file', filename: logFileName },
    console: { type: 'console' },
    justerrors: { type: 'logLevelFilter', appender: 'errors', level: 'error' }
  },
  categories: {
    default: { appenders: ['justerrors', 'console'], level: 'info' }
  }
});

export const logger = log4js.getLogger('test');

// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Gouda.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');
