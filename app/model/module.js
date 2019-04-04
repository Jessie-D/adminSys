'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Module = app.model.define('modules', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING,
    uri: STRING,
    describe: STRING,
    isMenu: INTEGER,
    isLeafNode: INTEGER,
    url: STRING,
    iconfont: STRING,
    sort: INTEGER,
    parent_id: STRING, // 假设parent_id没有值的时候，表示它是顶级module
    created_at: DATE,
    updated_at: DATE,

  });

  return Module;
};
