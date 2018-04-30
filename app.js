import Koa from 'koa';
const app = new Koa();
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
// import { userRouter } from './routers';
import Router from 'koa-router';

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));

app.use(json());
app.use(logger());


// handle error
const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = err.toString();
  }
};

app.use(handler);

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
user_router.post('/', (ctx)=>{
  
  ctx.set('Location', '/user/12/check_id');
  ctx.status = 200;
  // ctx.response.body = ;
  // ctx.response.set('Fosso', ['dew', 'we']);
  // ctx.response.set('Set-Cookie', 'k=sl[lp[rdtfyguhijok');
  // ctx.res.end(ctx.request.header.sessionid);
  ctx.body = ctx.query.gps;//ctx.request.body.user_id + ctx.request.body.password;
  // logger.info('?????');//+this.response.body);
  // ctx.status = 500;
  //var a = 1/0;
  // ctx.response.body = a;

  //ctx.throw(120);
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
