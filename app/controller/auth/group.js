'use strict';
const _ = require('underscore');
const Controller = require('../../core/baseController');

class authGroupController extends Controller {
  async index(ctx) {
    const query = ctx.request.query;

    // 获取传参中指定的key，且过滤掉为`空`的条件。
    const where = _.pick(_.pick(query, ...[ 'name' ]), value => {
      return value !== '' && value !== undefined;
    });

    const result = await ctx.service.auth.group.index(query.currentPage, query.pageSize, where);

    if (result) {
      this.success({
        ...result,
        list: result.list.map(obj => {
          return _.pick(obj, ...[ 'id', 'name', 'describe' ]);
        }),
      });
    }
  }

  async create(ctx) {
    const query = ctx.request.body;

    const createRule = {
      name: {
        type: 'string',
        required: true,
      },
      describe: {
        type: 'string',
        required: false,
      },
    };

    try {
      ctx.validate(createRule);
    } catch (err) {

      this.validateError(err);

      return;
    }

    const isExist = await this.ctx.model.Role.findOne({
      where: { name: query.name },
    });

    if (isExist) {

      this.failure({
        code: '-1',
        msg: '组名已存在',
        data: {
          name: query.name,
        },
        state: 422,
      });

      return false;
    }

    const result = await ctx.service.auth.group.create(_.pick(query, ...Object.keys(createRule)));

    if (result) {

      this.success({
        id: result.id,
      }, 201);
    }

  }

  async destroy(ctx) {
    const query = ctx.params;

    await ctx.service.auth.group.destroy(query.id);

    this.success();
  }

  async detail(ctx) {
    const query = ctx.params;

    const result = await ctx.service.auth.group.detail(query.id);

    if (!result) {

      this.failure({
        data: {},
        state: 404,
      });

      return false;
    }

    this.success(_.pick(result, ...[ 'id', 'name', 'describe' ]));
  }

  async update(ctx) {
    const id = ctx.params.id;
    const query = ctx.request.body;

    const isExist = await this.ctx.model.Role.findOne({
      where: {
        name: query.name,
        id: { $ne: id },
      },
    });
    if (isExist) {
      this.failure({
        code: '-1',
        msg: '组名已存在',
        data: {
          name: query.name,
        },
        state: 422,
      });

      return false;
    }

    const result = await ctx.service.auth.group.update(id, _.pick(query, ...[ 'name', 'describe' ]));

    if (!result) {
      this.failure({
        data: {},
        state: 404,
      });

      return false;
    }

    this.success();
  }

  async getUser(ctx) {
    const query = ctx.params;

    const role = (await ctx.model.Role.findOne({
      where: {
        id: query.id,
      },
    }));
    const users = (await ctx.model.UserRole.findAll({
      where: {
        role_id: role.id,
      },
    }));

    const allResult = await ctx.model.User.findAll();

    const allUser = [];
    allResult.forEach(obj => {
      allUser.push({
        key: obj.id,
        label: obj.name,
      });
    });

    this.success({
      addList: users ? users.map(item => item.user_id) : [],
      allList: allUser,
    });
  }

  async setUser(ctx) {
    const roleId = ctx.params.id;
    const idList = ctx.request.body.idList;

    await ctx.service.auth.userRole.setUser(roleId, idList);

    this.success();
  }

  async getModule(ctx) {
    const query = ctx.params;
    const role = (await ctx.model.Role.findOne({
      where: {
        id: query.id,
      },
    }));
    const modules = (await ctx.model.RoleModule.findAll({
      where: {
        role_id: role.id,
      },
      attributes: [ 'module_id' ],
    }));

    const allResult = await ctx.service.auth.module.system({
      parentId: '',
    });

    this.success({
      addList: modules ? modules.map(item => item.module_id) : [],
      allList: allResult,
    });


  }

  async setModule(ctx) {
    const roleId = ctx.params.id;
    const idList = ctx.request.body.idList;


    await ctx.service.auth.roleModule.setModule(roleId, idList);

    this.success();
  }
}
module.exports = authGroupController;
