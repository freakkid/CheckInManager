import os from 'os';
import { logger } from '../utils';

const defaultPort = 8000;
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

export var port = normalizePort(process.env.PORT) || defaultPort;

export const logFilePath = './checkIn.log';
export const db = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'checkInManager'
};

// 获取本机ipv4

let ipv4 = '127.0.0.1';
const ifaces = os.networkInterfaces();
let iptable = {}

for (var dev in ifaces) {
  var alias = 0;
  ifaces[dev].forEach(function (details) {
    if (details.family == 'IPv4') {
      iptable[dev + (alias ? ':' + alias : '')] = details.address;
      ++alias;
    }
  });
}

for (let key in iptable) {
  if (iptable[key] !== '127.0.0.1') {
    ipv4 = iptable[key];
    break;
  }
}

export const hostname = ipv4; // 供学生扫码链接
