'use strict';

module.exports = app => {
  class userService extends app.Service {

    async index(pageNumber = 1, pageSize = 20, query) {
      pageNumber = Number(pageNumber);
      pageSize = Number(pageSize);
      const data = await this.ctx.model.Role.findAndCountAll({
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

      const result = await this.ctx.model.Role.create(data);

      return result;
    }

    async destroy(id) {
      let transaction;
      try {
        transaction = await this.ctx.model.transaction();
        const role = await this.ctx.model.Role.findById(id);
        if (!module) {
          this.ctx.throw(404, 'role not found');
        }
        role.destroy();
        // 删除角色模块集合中与此角色相关的数据
        await this.ctx.model.RoleModule.destroy({
          where: {
            role_id: id,
          },
        });
        // 删除用户角色组集合中与此角色相关的数据
        await this.ctx.model.UserRole.destroy({
          where: {
            role_id: id,
          },
        });
        await transaction.commit();
        return;
      } catch (err) {
        await transaction.rollback();
        this.ctx.logger.error(err.message);
        return '';
      }

    }

    async detail(id) {
      const result = await this.ctx.model.Role.findOne({
        where: { id },
      });

      return result;
    }

    async update(id, data) {
      const newData = Object.assign(data, { id });

      try {
        return await this.ctx.model.Role.update(newData, {
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

