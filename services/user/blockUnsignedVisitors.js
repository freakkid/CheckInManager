import { sendData } from "../../utils";

/**
 * 检查是否登录，阻止未登录访问
 * 
 * @export
 * @param {any} ctx 
 * @param {any} next 
 */
export function blockUnsignedVisitors(ctx, next) {
  console.log('你在blockUnsignedVisitors')
  if (ctx.user_id) {
    next();
  } else {
    sendData(ctx, 401, JSON.stringify({message:'{请先登录}'}));
  }
}
