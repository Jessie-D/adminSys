'use strict';

const crypto = require('crypto');
const Controller = require('./../../core/baseController');

class sysPassportController extends Controller {

  async logout(ctx) {
    ctx.logout();

    this.success();
  }

  async login(ctx) {

    const userInfo = await ctx.model.User.findOne({
      where: {
        account: ctx.query.username,
        password: crypto.createHash('md5').update(ctx.query.password).digest('hex'),
      },
    });

    if (userInfo) {
      ctx.login({
        username: ctx.query.username,
        password: ctx.query.password,
      });

      const roleList = await ctx.model.UserRole.findAll({
        where: {
          user_id: userInfo.id,
        },
      });

      this.success({
        id: userInfo.id,
        userName: userInfo.name,
        groupList: roleList.map(item => item.role_id),
      });
    } else {
      this.failure({
        code: '1',
        data: {},
        msg: '账号或密码错误',
        state: 200,
      });
    }
  }
}
module.exports = sysPassportController;
