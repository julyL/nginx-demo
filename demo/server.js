const Koa = require("koa");
const path = require("path");
const static = require("koa-static");
const Router = require("koa-router");
const app = new Koa();

app.use(static("."));

var router = new Router();
router.get("*", (ctx, next) => {
  console.log('url: ' + ctx.url);
  next();
});

router.get("/", (ctx, next) => {
  ctx.body = "Hello Nginx";
  next();
});

router.get("/a", (ctx, next) => {
  ctx.body = "/a";
  next();
});

router.get("/b", (ctx, next) => {
  ctx.body = "/b";
  next();
});

router.get("/abc", (ctx, next) => {
  ctx.body = "/abc";
  next();
});


router.get("/a/:id", (ctx, next) => {
  ctx.body = "/a/:id";
  next();
});

router.get("/b/:id", (ctx, next) => {
  ctx.body = "/b/:id";
  next();
});

router.get("/d/:id", (ctx, next) => {
  ctx.body = "/d/:id";
  next();
});


router.get("/page", (ctx, next) => {
  ctx.body = ctx.req.url;
  next();
});

router.get("/page/:id", (ctx, next) => {
  ctx.body = "/page/:id";
  next();
});

router.get("/page/id", (ctx, next) => {
  ctx.body = "/page/id";
  next();
});

router.get("/p", (ctx, next) => {
  ctx.body = "/p";
  next();
});

router.get("/level/:level", (ctx, next) => {
  ctx.body = ctx.req.url;
  next();
});


app.use(router.routes());

app.listen(3000);
console.log("open localhost 3000");