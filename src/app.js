const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-better-body');
const Static = require('koa-static');
const path = require('path');
const compress = require('koa-compress')

const debt = require('./controller/debt');

const app = new Koa();

const router = Router();
router.use('/',
    debt.routes()
);

app
    .use(compress())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(Static(path.resolve(__dirname, 'static')))

app.listen(8008);
