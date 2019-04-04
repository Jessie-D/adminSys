'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Role = app.model.define('roles', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING,
    describe: STRING,
    created_at: DATE,
    updated_at: DATE,
  });


  return Role;
};
