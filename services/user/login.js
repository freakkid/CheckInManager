import { sessionServ } from '..';

export async function loginServ(user_id) {
  console.log('yuanwang')
  let ret = await sessionServ.addSessionID(user_id);
  console.log(ret)
  return ret;
}
