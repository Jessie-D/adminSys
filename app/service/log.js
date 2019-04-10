'use strict';


module.exports = app => {
  class logService extends app.Service {

    async index(pageNumber = 1, pageSize = 20, query) {
      pageNumber = Number(pageNumber);
      pageSize = Number(pageSize);
      const data = await this.ctx.model.Log.findAndCountAll({
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
      const result = await this.app.model.Log.create(data);

      return result;
    }

  }
  return logService;
};

