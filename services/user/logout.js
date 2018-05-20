import { sessionServ } from '..';

export async function logoutServ(session_id, user_id) {
  if (await sessionServ.getUserID(session_id) === user_id) {
    await sessionServ.deleteSessionID(session_id);
    return true;
  }
  return false;
}
