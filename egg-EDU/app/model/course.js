'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Course = app.model.define('courses', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    short_name: STRING(255),
    tips: STRING(255),
    description:TEXT,
    status:INTEGER,
    image_url:STRING(1000),
    created_at: DATE,
    updated_at: DATE,
  })
  return Course;
};