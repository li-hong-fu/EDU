const Controller = require('egg').Controller;

class UserController extends Controller {
  async sendSMS (){
    const ctx = this.ctx;
    try{
      let phone = ctx.request.body.phone;
      let created_at = new Date();
      let updated_at = new Date();
      let codeArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      let length = 6;
      let code = '';
      for (let i = 0; i < length; i++) {
        let randomI = Math.floor(Math.random() * 10);
        code += codeArr[randomI]
      }
      
      // const sms = await ctx.model.SmsLogs.findAll({where:{phone}})
      // if(sms <=0){
      //   await ctx.model.SmsLogs.create({phone, code, created_at})
      // } else {
      //   await ctx.model.SmsLogs.update(
      //     {code,updated_at},
      //     {where:{phone}}
      //   )
      // }
      // ctx.body = {code:200,message:code}

      const sendSMS = await this.service.aliyun.sendSMS(phone,code)
      if(sendSMS.Code == 'OK'){
        const sms = await ctx.model.SmsLogs.findAll({where:{phone}})
        if(sms <=0){
          await ctx.model.SmsLogs.create({phone, code, created_at})
        } else {
          await ctx.model.SmsLogs.update(
            {code,updated_at},
            {where:{phone}}
          )
        }
        ctx.body = {code:200,message:'验证码发送成功', data:code}
      } else {
        ctx.body = {code:0,message:'验证码发送失败'}
      }
    }catch(e){
      ctx.body = {code:0,message:'服务器错误'}
    }
  }

  async smsLogin() {
    const ctx = this.ctx;
    try{
      let phone = ctx.request.body.phone;
      let code = ctx.request.body.code;
      let section_key = 1;
      let created_at = new Date()
      const sms = await ctx.model.SmsLogs.findAll({where:{phone}})
      let time = '';
      let currentTime = new Date().getTime();
      if(sms[0].updated_at){
        let updatedTime = new Date(sms[0].updated_at).getTime();
        time = currentTime - updatedTime;
      }else{
        let createdTime = new Date(sms[0].created_at).getTime();
        time = currentTime - createdTime;
      }

      if(time >= 60000){
        ctx.body = {code:0,message:'该验证码已超时'}
        return
      }

      let state = sms.some(data => data.code === code)
      if(state){
        const token = this.app.jwt.sign({
          name:phone+`\t`+code
        },this.app.config.jwt.secret)
        const users = await ctx.model.Users.findAll({where:{phone}})
        if(users.length <= 0){
          console.log(phone,123123123123)
          const user = await ctx.model.Users.create({phone,section_key,created_at})
          ctx.body = {code:200,message:"注册成功",token,user_id:user.id}
          return
        }

        if(users[0].section_key == 1){
          ctx.body = {code:0,message:"该用户已登录"}
        }else{
          await ctx.model.Users.update(
            {section_key},
            {where:{phone}}
          )
          ctx.body = {code:200,message:"欢迎登录",token,user_id:users[0].id}
        }
      } else {
        ctx.body = {code:0,message:'验证码错误'}
      }
    }catch(e){
      ctx.body = {code:0,message:e}
    }
  }

  async getUserInfo() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      const users = await ctx.model.Users.findAll({where:{id}})
      ctx.body = {code:200,message:users}
    }catch(e){
      ctx.body = {code:0,message:e}
    }
  }

  async updated() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      let name = ctx.request.body.name;
      let sex = ctx.request.body.sex;
      let avatar_url = ctx.request.body.avatar_url;
      let birthday = ctx.request.body.birthday;
      let introduction = ctx.request.body.introduction;
      let updated_at = new Date()
      if(!name || !sex || !avatar_url || !birthday || !introduction){
        ctx.body = {code:0,message:"所有项必须填写!"}
        return
      }
      await ctx.model.Users.update(
        {name,sex,avatar_url,birthday,introduction,updated_at},
        {where:{id}}
      )
      ctx.body = {code:200,message:"修改个人信息成功!"}
    }catch(e){
      ctx.body = {code:0,message:e}
    }
  }

  async Logout() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      let section_key = 0;
      let last_visit_at = new Date();
      await ctx.model.Users.update(
        {section_key,last_visit_at},
        {where:{id}}
      )
      ctx.body = {code:200,message:'退出成功'}
    }catch(e){
      ctx.body = {code:0,message:"服务器错误!"}
    }
  }

  async phoneBind() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      let phone = ctx.request.body.phone;
      let code = ctx.request.body.code;
      const user = await ctx.model.Users.findAll({where:{phone}})
      if(user[0]){
        await ctx.model.Users.destroy({where:{phone}})
      }

      const sms = await ctx.model.SmsLogs.findAll({where:{phone}})
      let time = '';
      let currentTime = new Date().getTime();
      if(sms[0].updated_at){
        let updatedTime = new Date(sms[0].updated_at).getTime();
        time = currentTime - updatedTime;
      }else{
        let createdTime = new Date(sms[0].created_at).getTime();
        time = currentTime - createdTime;
      }

      if(time >= 60000){
        ctx.body = {code:0,message:'该验证码已超时'}
        return
      }
      let state = sms.some(data => data.code === code)
      if(state){
        await ctx.model.Users.update(
          {phone},
          {where:{id}}
        )
        ctx.body = {code:200,message:'绑定成功'}
      }else{
        ctx.body = {code:0,message:'验证码错误'}
      }
    }catch(e){
      ctx.body = {code:0,messge:e}
    }
  }

  async relievePhone() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      const user = await ctx.model.Users.findByPk(id);
      if(user.unionid == null){
        ctx.body = {code:0,message:'必须绑定一项安全'}
        return
      }
      await ctx.model.Users.update(
        {phone:null},
        {where:{id}}
      )
      ctx.body = {code:200,message:'成功解绑手机'}
    }catch(e){
      ctx.body = {code:0,message:'服务器出错了'}
    }
  }
}

module.exports = UserController