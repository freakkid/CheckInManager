import { sessionServ } from "..";

export async function logoutServ(session_id, user_id) {
  if (await sessionServ.getSessionID(session_id) === user_id) {
    return await sessionServ.deleteSessionID(session_id) === 1;
  }
  return false;
}
