const Controller = require('egg').Controller;
const axios = require('axios');

class WechatController extends Controller{
  async wechat (){
    const ctx = this.ctx;
    try{
      const code = ctx.request.body.code;
      const appid = this.config.wechat.appid;
      const secret = this.config.wechat.secret;
      const access_token = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`;
      const userinfo =  await axios.get(access_token).then(res => {
        const data = res.data;
        const open = `https://api.weixin.qq.com/sns/userinfo?access_token=${data.access_token}&openid=${data.openid}`;
        return axios.get(open).then(res => {
          return res.data
        })
      })
      if(userinfo){
        const token = this.app.jwt.sign({
          name:userinfo.openid+'\t'+userinfo.unionid+'\t'+userinfo.nickname
        },this.app.config.jwt.secret)

        let unionid = userinfo.unionid;
        let section_key = 1;
        let created_at = new Date();
        const users = await ctx.model.Users.findAll({where:{unionid}})//出错了
        
        if(users.length <= 0){
          const user = await ctx.model.Users.create({unionid,section_key,created_at})
          ctx.body = {code:200,message:"注册成功",token,user_id:user.id}
          return
        }

        if(users[0].section_key == 1){
          ctx.body = {code:0,message:"该用户已登录"}
        }else{
          await ctx.model.Users.update(
            {section_key},
            {where:{unionid}}
          )
          ctx.body = {code:200,message:"欢迎登录",token,user_id:users[0].id}
        }
      }
    }catch(e){
      ctx.body = {code:0, message:e}
    }
  }

  async wechatBind() {
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const code = ctx.request.body.code;
      const appid = this.config.wechat.appid;
      const secret = this.config.wechat.secret;
      const access_token = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`;
      const userinfo =  await axios.get(access_token).then(res => {
        const data = res.data;
        const open = `https://api.weixin.qq.com/sns/userinfo?access_token=${data.access_token}&openid=${data.openid}`;
        return axios.get(open).then(res => {
          return res.data
        })
      })
      const unionid = userinfo.unionid
      const user = await ctx.model.Users.findAll({where:{unionid}})
      if(user[0]){
        await ctx.model.Users.destroy({where:{unionid}})
      }
      await ctx.model.Users.update(
        {unionid},
        {where:{id}}
      )
      ctx.body = {code:200,message:'成功绑定'}
    }catch(e){
      ctx.body = {code:0,message:'服务器出错'}
    }
  }

  async relieveWechat() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      const user = await ctx.model.Users.findByPk(id);
      if(user.phone == null){
        ctx.body = {code:0,message:'必须绑定一项安全'}
        return
      }
      await ctx.model.Users.update(
        {unionid:null},
        {where:{id}}
      )
      ctx.body = {code:200,message:'成功解绑微信'}
    }catch(e){
      ctx.body = {code:0,message:'服务器出错了'}
    }
  }
}

module.exports = WechatController