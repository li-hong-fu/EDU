module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Materials = app.model.define('advertise-material', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    sort: INTEGER,
    open:STRING(255),
    jump_link:TEXT,
    image_url:TEXT,
    created_at: DATE,
    updated_at: DATE,
  })
  return Materials;
};