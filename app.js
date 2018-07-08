import Koa from 'koa';
const app = new Koa();

//静态资源处理
const path = require('path');
const serve = require('koa-static');
const static_resource_handler = serve(path.join(__dirname, '/views'));

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
    ctx.response.body = '服务器出错了qaq';
  }
};

app.use(handler);

// 静态文件处理
app.use(static_resource_handler);
// router
app.use(router.routes())
  .use(router.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

export default app;
