import { sessionServ } from '..';

export async function loginServ(user_id) {
  return await sessionServ.addSessionID(user_id);
}
