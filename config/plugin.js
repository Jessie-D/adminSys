'use strict';

// 本地静态资源(其实不需要配置，默认值就是true)
exports.static = true;

// 模版引擎
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

// 表单验证
exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

// alinode性能监控
exports.alinode = {
  enable: true,
  package: 'egg-alinode',
};

// egg官方提供的通用的静态资源管理和本地开发方案
exports.assets = {
  enable: true,
  package: 'egg-view-assets',
};
