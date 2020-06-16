'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Questions = app.model.define('skill_questions', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    stem:TEXT,
    stack_id: INTEGER,
    level: INTEGER,
    option: TEXT,
    correct:INTEGER,
    created_at: DATE,
    updated_at: DATE,
  })
  return Questions;
};