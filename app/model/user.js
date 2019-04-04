'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const User = app.model.define('users', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING,
    account: String,
    password: STRING,
    remark: STRING,
    status: INTEGER,
    created_at: DATE,
    updated_at: DATE,
    qq: INTEGER,
    sex: INTEGER,
    address: STRING,
    mobile: STRING,
    email: String,
  });


  return User;
};
