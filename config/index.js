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
  password: 'ugnamsung@1117',
  database: 'checkInManager'
};

export const hostname = '192.168.1.1'; // ? 供学生扫码链接

