module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT, DOUBLE } = app.Sequelize;

  const Advertise = app.model.define('advertise', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    slug: STRING(255),
    width:DOUBLE,
    height:DOUBLE,
    created_at: DATE,
    updated_at: DATE,
  })
  return Advertise;
};