'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Managers = app.model.define('managers', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    phone:STRING(255),
    role_id:INTEGER,
    password: STRING(30),
    created_at: DATE,
    updated_at: DATE,
  })
  return Managers;
};