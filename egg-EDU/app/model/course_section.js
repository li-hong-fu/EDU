'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Section = app.model.define('courses-sections', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    chapter_id: INTEGER,
    name: STRING(255),
    content: TEXT,
    video_url:TEXT,
    sort:INTEGER,
    created_at: DATE,
    updated_at: DATE,
  })
  return Section;
};