'use strict';

const crypto = require('crypto');

module.exports = app => {
  class userService extends app.Service {

    async index(pageNumber = 1, pageSize = 20, query) {
      pageNumber = Number(pageNumber);
      pageSize = Number(pageSize);
      const data = await this.ctx.model.User.findAndCountAll({
        where: query, // WHERE 条件
        offset: (pageNumber - 1) * pageSize,
        limit: pageSize,
      });
      return this.ctx.response.format.paging({
        resultList: data.rows,
        totalLength: data.count,
        pageSize,
        currentPage: Number(pageNumber),
      });
    }

    async create(data) {
      const result = await this.app.model.User.create(Object.assign(data, {
        password: crypto.createHash('md5').update(data.password).digest('hex'),
      }));

      return result;
    }

    async destroy(id) {
      let transaction;
      try {
        transaction = await this.ctx.model.transaction();
        const user = await this.ctx.model.User.findById(id);
        if (!user) {
          this.ctx.throw(404, 'User not found');
        }
        user.destroy();
        // 删除用户组集合中与此模块相关的数据
        await this.ctx.model.UserRole.destroy({
          where: {
            user_id: id,
          },
        });
        await transaction.commit();
        return id;
      } catch (err) {
        await transaction.rollback();
        this.ctx.logger.error(err.message);
        return '';
      }

    }

    async detail(id) {
      const result = await this.app.model.User.findOne({
        where: { id },
      });

      return result;
    }

    async update(id, data) {
      let newData = Object.assign(data, { id });

      if (data.password) {
        newData = Object.assign(newData, {
          password: crypto.createHash('md5').update(data.password).digest('hex'),
        });
      }

      try {
        return await this.app.model.User.update(newData, {
          where: { id },
        });
      } catch (err) {
        this.ctx.logger.error(err.message);
        return '';
      }
    }
  }
  return userService;
};

