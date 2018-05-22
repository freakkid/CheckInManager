import Koa from 'koa';
const app = new Koa();
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import Router from 'koa-router';
import request from 'request';

import { router } from './routers';


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
    // console.log(err);
    
    ctx.response.body = err;
  }
};

app.use(handler);

// router
app.use(router.routes())
  .use(router.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

export default app;
