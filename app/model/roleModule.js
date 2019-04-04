'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const RoleModule = app.model.define('role_module', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_id: INTEGER,
    module_id: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  RoleModule.associate = function() {
    app.model.RoleModule.belongsTo(app.model.Module, { as: 'module', foreignKey: 'module_id' });
    app.model.RoleModule.belongsTo(app.model.Role, { as: 'role', foreignKey: 'role_id' });
  };

  RoleModule.findByIdWithRole = async function(id, roleId) {
    return await this.findOne({
      where: { id, role_id: roleId },
    });
  };

  return RoleModule;
};
