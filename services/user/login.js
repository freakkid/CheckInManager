import { sessionServ } from '..';

// TODO 清理log
export async function loginServ(user_id) {
  return await sessionServ.addSessionID(user_id);
  // console.log(ret)
  // return ret;
}
