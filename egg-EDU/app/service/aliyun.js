const Service = require('egg').Service;
const Core = require('@alicloud/pop-core');

class AlismsService extends Service {
  async sendSMS (phone, code){
    const client = await this.client();
    const params = await this.params(phone, code);
    const requestOption = await this.requestOption();
    try{
      const send = await this.send(client, params, requestOption);
      return JSON.parse(send)
    }catch(err){
      this.ctx.errorHandle(err)
    }
  }

  async client (){
    return new Core({
      accessKeyId:this.config.aliSMS.accessKeyId,
      accessKeySecret:this.config.aliSMS.secretAccessKey,
      endpoint:'https://dysmsapi.aliyuncs.com',
      apiVersion: '2017-05-25'
    })
  }

  async params (phone, code){
    return {
      "RegionId": this.config.aliSMS.RegionId,
      "PhoneNumbers": `${phone}`,
      "SignName": this.config.aliSMS.SignName,
      "TemplateCode":this.config.aliSMS.TemplateCode,
      "TemplateParam": `{\"code\":${code}}`
    }
  }

  async requestOption (){
    return {
      method: 'POST'
    }
  }

  async send (client, params, requestOption){
    return new Promise((resolve,reject) => {
      client.request('SendSms', params, requestOption)
        .then((result) => {
          resolve(JSON.stringify(result))
      })
        .catch((ex) => {
          reject(ex)
        })
    })
  }
}

module.exports = AlismsService