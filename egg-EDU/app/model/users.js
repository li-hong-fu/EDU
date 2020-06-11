'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Users = app.model.define('users', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    real_name: STRING(255),
    unionid:STRING(255),
    section_key:STRING(255),
    phone:STRING(30),
    avatar_url:TEXT,
    sex:INTEGER,
    birthday:DATE,
    introduction:STRING(255),
    last_visit_at:DATE,
    created_at: DATE,
    updated_at: DATE,
  })
  return Users;
};