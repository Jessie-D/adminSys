'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Rog = app.model.define('logs', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    operator: STRING,
    status1: STRING,
    status2: STRING,
    created_at: DATE,
  });


  return Rog;
};
