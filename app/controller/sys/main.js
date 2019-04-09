'use strict';
const Controller = require('./../../core/baseController');
const _ = require('underscore');

const uriToList = uri => {
  const urilist = uri.split('.').filter(i => i);
  return urilist.map((uriItem, index) => {
    return `${urilist.slice(0, index + 1).join('.')}`;
  });
};

class sysMainController extends Controller {

  async sidebar(ctx) {
    if (!ctx.isAuthenticated()) {
      this.failure({
        data: ctx.user,
        state: 401,
      });

      return false;
    }

    const userGroupData = await ctx.model.UserRole.findAll({
      where: {
        user_id: ctx.user.id,
      },
    });

    const roleModulePromise = [];
    userGroupData.forEach(item => {
      roleModulePromise.push(ctx.model.RoleModule.findAll({
        where: {
          role_id: item.role_id,
        },
        attributes: [ 'module_id' ],
      }));
    });
    const moduleData = await Promise.all(roleModulePromise);

    // moduleData = moduleData.map(item => item.toJSON().module_id);

    const userAuthModulePromise = [];
    _.union(...moduleData) // 去重
      .forEach(item => {
        userAuthModulePromise.push(ctx.model.Module.findOne({
          where: {
            id: item.module_id,
          },
        }));

      });

    let result = await Promise.all(userAuthModulePromise);

    result = result.filter(item => !!item); // 过滤结果为null的项

    const parentNodePromise = [];
    result.forEach(function(obj) {
      if (!obj.isMenu) {
        const parentUriList = uriToList(obj.uri);
        parentUriList.pop();
        parentNodePromise.push(ctx.model.Module.findAll({
          where: {
            uri: { $in: parentUriList },
          },
        }));
      }
    });

    const parentNodes = await Promise.all(parentNodePromise);
    const data = [ ...result ];
    let pnodes = [];
    parentNodes.forEach(pitem => {
      pnodes = pnodes.concat(...pitem);
    });
    pnodes.forEach(pitem => {
      let has = false;
      data.forEach(item => {
        if (pitem.id === item.id) {
          has = true;
        }
      });
      if (!has) {
        data.push(pitem);
      }
    });


    // 根据父级id遍历子集
    const subset = function(parentId) {
      const arr = [];

      // 查询该id下的所有子集
      data.forEach(function(obj) {
        if (obj.parent_id === String(parentId) && obj.isMenu) {
          arr.push(Object.assign(obj, {
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
          return 1;
        } else if (val1.sort > val2.sort) {
          return -1;
        }
        return 0;

      });

      return arr;
    };

    const convert = function(arr) {
      const arrMap = [];
      arr.forEach(obj => {
        arrMap.push({
          icon: obj.iconfont,
          name: obj.name,
          path: obj.url || '',
          isLeafNode: obj.isLeafNode || false,
          describe: obj.describe,
          children: obj.children && convert(obj.children),
        });
      });
      return arrMap;
    };

    this.success(convert(subset('')));
  }
}
module.exports = sysMainController;
