const Koa = require("koa");
const path = require("path");
const static = require("koa-static");
const Router = require("koa-router");
const app = new Koa();

app.use(static("."));

var router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = "hello";
  next();
});

app.use(router.routes());

app.listen(3000);
console.log("open localhost 3000");
