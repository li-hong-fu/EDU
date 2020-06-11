module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Versions = app.model.define('projects-versions', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    project_id:INTEGER,
    name:STRING(255),
    sort:INTEGER,
    created_at: DATE,
    updated_at: DATE,
  })
  return Versions;
};