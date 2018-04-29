import Koa from 'koa';
const app = new Koa();
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import { userRouter } from './routers';
import Router from 'koa-router';

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));

app.use(json());
app.use(logger());


// handle error
// const handler = async (ctx, next) => {
//   try {
//     await next();
//   } catch (err) {
//     ctx.response.status = 500;
//     ctx.response.body = 'Server error';
//   }
// };

// app.use(handler);

// logger
// async function test(ctx, next) {
//   const start = new Date();
//   next();
//   const ms = new Date() - start;
//   logger.log(`${this.method} ${this.url} - ${ms}ms`);
// }
// app.use(test);

// router
// app.use(userRouter.routes())
//   .use(userRouter.allowedMethods());

const router = new Router();

const user_router = new Router();
user_router.get('/', (ctx)=>{
  ctx.body = 'user';
  ctx.status = 200;
});

router.get('/', (ctx)=>{
  ctx.body = 'index';
  ctx.status = 200;
});



const checkin_router = new Router();
checkin_router.get('/', (ctx)=>{
  const user = ctx.params.user_id;
  ctx.body = user + '???password';
  ctx.status = 200;
});

user_router.use('/:user_id/check_id', checkin_router.routes(), checkin_router.allowedMethods());
router.use('/user', user_router.routes(), user_router.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

export default app;
