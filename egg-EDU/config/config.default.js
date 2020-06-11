/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1588817767813_8348';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.cors = {
    credentials: true,
    origin: ctx => ctx.get('origin'),
    allpwMethods:'GET,HEAD,PUT,POST,DELETE,PATCH',
  }

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['http://localhost:8080']
  }

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    password:'',
    database: 'combat-edu',
    username:'root',
    define:{ // model的全局配置
      timestamps: false,   // 不添加create,update,delete时间戳
      paranoid: true,   // 添加软删除
      freezeTableName: true,  // 防止修改表名为复数
      underscored: false  // 防止驼峰式字段被默认转为下划线
    }
  };

  config.jwt = {
    secret: '123456',
  };

  config.aliSMS = {
    accessKeyId:'LTAI4FbccUoZCvutZu4byYFf',
    secretAccessKey:'NAVReeycr6iie3fujlIX7KDKL9xEQj',
    SignName:'扎克斯',
    TemplateCode: 'SMS_173660228',
    RegionId:'cn-hangzhou'
  }

  config.wechat = {
    redirectUrl: 'edu-www.aitschool.com',
    appid: 'wxf31cb4f589ed68c3',
    secret: '69c8c3175f0db105541943aa5f3f45dd'
  }

  return {
    ...config,
    ...userConfig,
  };
};
