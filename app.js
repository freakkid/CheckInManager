import Koa from 'koa';
const app = new Koa();
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import Router from 'koa-router';
import request from 'request';
import { toMid } from './utils';

import {router} from './routers';
async function test() {
  return await new Promise(function(resolve, reject) {
    request('http://apis.juhe.cn/qrcode/api?key=df6616c88fd11236bba916113cbb704b&text=https://www.baidu.com&type=2', function (error, response, body) {
      if (!error && response.statusCode === 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}


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

// router
app.use(router.routes())
  .use(router.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

export default app;
