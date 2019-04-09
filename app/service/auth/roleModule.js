'use strict';


module.exports = app => {
  class moduleService extends app.Service {

    async setModule(roleId, idList) {
      let transaction;
      const userAuthModulePromise = [];
      try {
        transaction = await this.ctx.model.transaction();

        // 删除角色模块组集合中与此角色相关的数据
        await this.ctx.model.RoleModule.destroy({
          where: {
            role_id: roleId,
          },
        });
        idList.forEach(item => {
          userAuthModulePromise.push(this.ctx.model.RoleModule.create({
            module_id: item,
            role_id: roleId,
          }));

        });

        await Promise.all(userAuthModulePromise);
        await transaction.commit();
        return;
      } catch (err) {
        await transaction.rollback();
        this.ctx.logger.error(err.message);
        return '';
      }

    }

  }
  return moduleService;
};

