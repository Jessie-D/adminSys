'use strict';


module.exports = app => {
  class moduleService extends app.Service {

    async index(pageNumber = 1, pageSize = 20, query) {
      pageNumber = Number(pageNumber);
      pageSize = Number(pageSize);
      const data = await this.ctx.model.Module.findAndCountAll({
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
      data = { ...data, isMenu: data.isMenu ? 1 : 0, isLeafNode: data.isLeafNode ? 1 : 0 };
      const result = this.ctx.model.Module.create(data);

      return result;
    }

    async destroy(id) {
      let transaction;
      try {
        transaction = await this.ctx.model.transaction();
        const module = await this.ctx.model.Module.findById(id);
        if (!module) {
          this.ctx.throw(404, 'module not found');
        }
        module.destroy();
        // 删除用户组集合中与此模块相关的数据
        await this.ctx.model.RoleModule.destroy({
          where: {
            module_id: id,
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
      const result = await this.ctx.model.Module.findOne({
        where: { id },
        attributes: [ 'id', 'name', 'url', 'uri', 'iconfont', 'describe', 'sort', 'isMenu', 'isLeafNode', 'url', 'parent_id' ],
      });
      return result;
    }

    async update(id, data) {

      try {
        return await this.ctx.model.Module.update(data, {
          where: { id },
        });
      } catch (err) {
        this.ctx.logger.error(err.message);
        return '';
      }
    }

    async system(opts) {
      const isAll = !opts.filterHide;
      const id = opts.parentId;

      let originalObj = null;

      // if (isAll) {
      //   originalObj = await this.ctx.model.Module.findAll({
      //     attributes: [ 'name', 'sort', 'parent_id' ],
      //   });
      // } else {
      originalObj = await this.ctx.model.Module.findAll();
      // }

      // this.ctx.logger.debug(originalObj);

      const subset = function(parentId) { // 根据父级id遍历子集
        const arr = [];

        // 查询该id下的所有子集
        originalObj.forEach(function(obj) {
          if ((obj.parent_id ? obj.parent_id : obj.parent_id) === String(parentId)) {
            arr.push(Object.assign(obj.toJSON(), {
              id: obj.id,
              children: subset(obj.id),
            }));
          }
        });

        // 如果没有子集 直接退出
        if (arr.length === 0) {
          return [];
        }

        // 对子集进行排序
        arr.sort(function(val1, val2) {
          if (val1.sort < val2.sort) {
            return -1;
          } else if (val1.sort > val2.sort) {
            return 1;
          }
          return 0;

        });

        return arr;
      };

      return subset(id || '');
    }
  }
  return moduleService;
};

