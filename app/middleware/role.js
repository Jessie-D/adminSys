'use strict';

module.exports = action => {
  return async function(ctx, next) {
    const isLogin = ctx.isAuthenticated();
    const userInfo = ctx.user;

    const noAccess = () => {
      ctx.body = {
        code: '403',
        msg: ctx.helper.errorCode['403'],
        result: {
          userId: userInfo,
          uri: action,
        },
      };
      ctx.status = 403;
    };

    if (!isLogin) {
      if (ctx.acceptJSON) {
        ctx.body = {
          code: '401',
          msg: ctx.helper.errorCode['401'],
          result: {
            userId: userInfo,
            uri: action,
          },
        };
        ctx.status = 401;
      } else {
        ctx.redirect('/login?redirect=' + encodeURIComponent(ctx.originalUrl));
      }

      return false;
    }

    const roleList = await ctx.model.UserRole.findAll({
      where: {
        user_id: userInfo.id,
      },
    });

    if (roleList === null || !roleList.length) {
      noAccess();
    }

    const module = await ctx.model.Module.findOne({
      where: {
        uri: action,
      },
    });

    for (let i = 0, l = roleList.length; i < l; i++) {
      if (module) {
        const result = await ctx.model.RoleModule.findOne({
          where: {
            role_id: roleList[i].role_id,
            module_id: module.id,
          },
        });
        if (result) {
          await next();

          return true;
        }
      }
    }
    noAccess();
  };
};
