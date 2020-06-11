module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Projects = app.model.define('projects', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    description:TEXT,
    content:TEXT,
    status:INTEGER,
    image_url:TEXT,
    created_at: DATE,
    updated_at: DATE,
  })
  return Projects;
};