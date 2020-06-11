module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Permissions = app.model.define('managers-permissions', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    slug:STRING(255),
    group_id:INTEGER,
  })
  return Permissions;
};