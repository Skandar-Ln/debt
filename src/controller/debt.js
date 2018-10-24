const _ = require('lodash');
const math = require('mathjs');
const Router = require('koa-router');

const util = require('./util');
const Debt = require('../model/debt');

const koaRouter = Router();

koaRouter.post('api/debt/list', async (ctx, next) => {
    const fields = ctx.request.fields || {};
    const {page = 1, size = 999} = fields;

    await Debt.findAll({
        offset: size * (page -1),
        limit: size,
        order: [['id', 'DESC']]
    }).then(function(res) {
        ctx.body = {
            result: res,
            page,
            size
        };
    })
});

koaRouter.post('api/debt/change', async (ctx, next) => {
    const fields = ctx.request.fields;
    const params = fields;

    if (_.isNumber(params.changed)) {
        util.rejectHandler(ctx, '请输入数字');
    }

    await Debt.findOne({
        order: [['id', 'DESC']]
    }).then(async (res) => {
        res = res || {};

        let left = res.left || 0;

        // 除二逻辑
        let bigChanged = math.bignumber(params.changed);
        bigChanged = params.isHalf ? math.divide(bigChanged, math.bignumber(2)) : bigChanged;

        const bigLeft = math.bignumber(left);
        left = math.number(bigLeft[params.isAdd ? 'add' : 'sub'](bigChanged));

        await Debt.create({
            ...params,
            changed: math.number(bigChanged),
            left
        }).then(async function(files) {
            util.successHandler(ctx, '插入成功');
        });
    })
});

module.exports = koaRouter;
