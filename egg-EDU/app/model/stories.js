module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Stories = app.model.define('projects-stories', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    version_id:INTEGER,
    project_id:INTEGER,
    name:STRING(255),
    content:TEXT,
    sort:INTEGER,
    created_at: DATE,
    updated_at: DATE,
  })
  return Stories;
};