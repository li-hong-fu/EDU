module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const PermissionGroups = app.model.define('managers-permission_groups', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
  })
  return PermissionGroups;
};