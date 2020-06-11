module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Sms_logs = app.model.define('user-sms', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    template: STRING(30),
    content: TEXT,
    phone:STRING(30),
    code:STRING(30),
    status:INTEGER,
    created_at: DATE,
    updated_at: DATE,
  })
  return Sms_logs;
};