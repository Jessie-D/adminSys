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
      const result = await this.app.model.User.remove({
        id,
      });

      // 删除用户组集合中与此用户相关的数据
      this.ctx.model.Group.update({},
        {
          $pull: { users: id },
        }
      );

      return result.result.n !== 0 && result;

    }

    async edit(id) {
      const result = await this.app.model.User.findOne({
        id,
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
        return await this.app.model.User.findByIdAndUpdate(id, newData, {
          new: true,
          runValidators: true,
        }).exec();
      } catch (err) {
        this.ctx.logger.error(err.message);
        return '';
      }
    }
  }
  return userService;
};

