module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Roles = app.model.define('managers-roles', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    description:TEXT,
    created_at: DATE,
    updated_at: DATE,
  })
  return Roles;
};