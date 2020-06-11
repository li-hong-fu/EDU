'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const ZhiYePath = app.model.define('zhiye-path', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    sort: INTEGER,
    zhiye_id:INTEGER,
    description:TEXT,
    created_at: DATE,
    updated_at: DATE,
  })
  return ZhiYePath;
};