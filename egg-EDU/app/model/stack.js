'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Stack = app.model.define('stacks', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    slug: STRING(255),
    // tag_line: STRING(1000),
    status:INTEGER,
    image_url:STRING(1000),
    description:TEXT,
    created_at: DATE,
    updated_at: DATE,
  })
  return Stack;
};