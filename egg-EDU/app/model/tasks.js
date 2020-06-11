module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Tasks = app.model.define('projects-tasks', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    story_id:INTEGER,
    version_id:INTEGER,
    project_id:INTEGER,
    name:STRING(255),
    content:TEXT,
    status:INTEGER,
    level:INTEGER,
    platform:INTEGER,
    sort:INTEGER,
    created_at: DATE,
    updated_at: DATE,
  })
  return Tasks;
};