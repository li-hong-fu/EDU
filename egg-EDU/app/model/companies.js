module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Companie = app.model.define('companies', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    short_name: STRING(255),
    slogan:STRING(255),
    code:STRING(30),
    introduction:TEXT,
    contact_name:STRING(30),
    contact_phone:STRING(30),
    image_url:TEXT,
    created_at: DATE,
    updated_at: DATE,
  })
  return Companie;
};