import crypto from 'crypto';

export function md5Hash(data) {
  return crypto.createHash('md5').update(data).digest('hex');
}
