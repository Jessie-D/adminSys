'use strict';

module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize;
  const UserRole = app.model.define('user_role', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: INTEGER,
    role_id: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  UserRole.associate = function() {
    app.model.UserRole.belongsTo(app.model.User, { as: 'user', foreignKey: 'user_id' });
    app.model.UserRole.belongsTo(app.model.Role, { as: 'role', foreignKey: 'role_id' });
  };

  UserRole.findByIdWithUser = async function(id, userId) {
    return await this.findOne({
      where: { id, user_id: userId },
    });
  };


  return UserRole;
};
