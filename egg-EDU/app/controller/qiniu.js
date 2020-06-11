'use strict';

const Controller = require('egg').Controller;
const qiniu = require('qiniu');
const path = require('path');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync(path.resolve(__dirname,"config.json")))

class QiniuController extends Controller {
  async qinius() {
    const { ctx } = this;
    try{
      const accessKey = config.accessKey
      const secretKey = config.secretKey
      const bucket = config.bucket
      const domain = config.domain
      const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
      const options = {
        scope:bucket
      }
      const putPolicy = new qiniu.rs.PutPolicy(options)
      const uploadToken= putPolicy.uploadToken(mac)
      ctx.body = {code:200,token:uploadToken,domain}
    }catch(e){
      console.log(e)
      ctx.body = {code:0,message:'server error'}
    }
  }
}

module.exports = QiniuController;