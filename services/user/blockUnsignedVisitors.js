import { sendData } from '../../utils';

/**
 * 检查是否登录，阻止未登录访问
 * 
 * @export
 * @param {any} ctx 
 * @param {any} next 
 */
export async function blockUnsignedVisitors(ctx, next) {
   //console.log('你在blockUnsignedVisitors');
   //console.log(ctx.user_id);
   //console.log(ctx.request.body.user_id);
  if (ctx.user_id) {
    return await next();
  }
  sendData(ctx, 401, JSON.stringify({message:'{请先登录}'}));
}
