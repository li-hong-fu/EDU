'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const ZhiYe = app.model.define('zhiye', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    sort: INTEGER,
    image_url:TEXT,
    description:TEXT,
    status:INTEGER,
    created_at: DATE,
    updated_at: DATE,
  })
  return ZhiYe;
};