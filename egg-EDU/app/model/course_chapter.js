'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Chapter = app.model.define('courses-chapters', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    course_id: INTEGER,
    name: STRING(255),
    sort: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  })
  return Chapter;
};