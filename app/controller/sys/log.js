'use strict';
const _ = require('underscore');

const Controller = require('../../core/baseController');

class logController extends Controller {
  async index(ctx) {
    const query = ctx.request.query;

    // 获取传参中指定的key，且过滤掉为`空`的条件。
    const where = _.pick(_.pick(query, ...[ 'operator', 'status1', 'status2', 'created_at' ]), value => {
      return value !== '' && value !== undefined;
    });

    const result = await ctx.service.log.index(query.currentPage, query.pageSize, where);

    this.success({
      ...result,
      list: result.list,
    });
  }

  async create(ctx) {
    const query = ctx.request.body;

    const createRule = {
      operator: {
        type: 'string',
        required: true,
      },
      status1: {
        type: 'string',
        required: true,
      },
      status2: {
        type: 'string',
        required: false,
        allowEmpty: true,
      },
    };

    try {
      ctx.validate(createRule);
    } catch (err) {

      this.validateError(err);

      return;
    }


    const result = await ctx.service.log.create(_.pick(query, ...Object.keys(createRule)));

    if (result) {
      this.success({
        id: result.id,
      }, 201);
    }

  }

}
module.exports = logController;
