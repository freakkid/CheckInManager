import Koa from 'koa';
const app = new Koa();
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import { userRouter } from './routers';

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
    ctx.response.body = 'Server error';
  }
};

app.use(handler);

// logger
async function test(next) {
  const start = new Date();
  next();
  const ms = new Date() - start;
  logger.log(`${this.method} ${this.url} - ${ms}ms`);
}
app.use(test);

// router

app.use(userRouter.routes())
  .use(userRouter.allowedMethods());

export default app;
