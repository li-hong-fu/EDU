module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const RolePermissions = app.model.define('managers-role_permissions', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    role_id:INTEGER,
    permission_slug:STRING(255),
  })
  return RolePermissions;
};