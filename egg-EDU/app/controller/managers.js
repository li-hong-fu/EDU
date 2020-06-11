// app/controller/users.js
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class ManageController extends Controller {
  async passwordLogin() {
    const ctx = this.ctx
    let phone = ctx.request.body.phone
    let password = ctx.request.body.password
    if(!phone || !password){
      ctx.body = { code:0,message:'缺少必要参数!' }
      return
    }
    try{
      const Managers = await ctx.model.Managers.findAll({where:{phone, password}})
      const Manager = Managers[0]
      if(Manager){
        const token = this.app.jwt.sign({
          name:Manager.name+`\t`+phone+`\t`+password+`\t`+Manager.id
        },this.app.config.jwt.secret)
        ctx.body = { code:200,message:'登陆成功!',token}
      }
    }catch(e){
      ctx.body = { code:0,message:'登录失败!' }
    }
  }

  async index() {
    const ctx = this.ctx;
    try{
      const managers = await ctx.model.Managers.findAll();
      const roles = await ctx.model.Roles.findAll();

      let manager = []
      managers.forEach(data => {
        data.dataValues.role_name = {}
        manager.push(data.dataValues)
      })
      roles.forEach(data => {
        let id = data.dataValues.id;
        console.log(id)
        let name = data.dataValues.name;
        managers.forEach((data,index) => {
          if(id === data.dataValues.role_id){
            manager[index].role_name = name
          }
        })
      })
      ctx.body = {code:200,message:manager}
    }catch(e){
      ctx.body = {code:0,message:'管理员列表服务器错误!'}
    }
  }

  async created() {
    const ctx = this.ctx;
    try{
      let name = ctx.request.body.name;
      let phone = ctx.request.body.phone;
      let password = ctx.request.body.password;
      let role_id = ctx.request.body.role_id;
      let created_at = new Date()
      if(!name || !phone || !password || !role_id){
        ctx.body = {code:0,message:'缺少必要参数!'}
        return
      }
      await ctx.model.Managers.create({name,phone,password,role_id,created_at})
      ctx.body = {code:200,message:'添加成功!'}
    }catch(e){
      ctx.body = {code:0,message:'添加管理服务器错误!'}
    }
  }

  async indexItem() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      const managers = await ctx.model.Managers.findByPk(id)
      ctx.body = {code:200,message:managers}
    }catch(e){
      ctx.body = {code:0,message:'获取管理员失败!'}
    }
  }
  
  async updated() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      let name = ctx.request.body.name;
      let phone = ctx.request.body.phone;
      let password = ctx.request.body.password;
      let role_id = ctx.request.body.role_id;
      let updated_at = new Date();
      if(!name || !phone || !password || !role_id){
        ctx.body = {code:0,message:'缺少必要参数!'}
        return
      }
      await ctx.model.Managers.update(
        {name,phone,password,role_id,updated_at},
        {where:{id}}
      )
      ctx.body = {code:200,message:'编辑成功!'}
    }catch(e){
      ctx.body = {code:0,message:'编辑管理错误!'}
    }
  }
  
  async delete() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      console.log(id)
      await ctx.model.Managers.destroy({where:{id}})
      ctx.body = {code:200,message:"删除成功!"}
    }catch(e){
      ctx.body = {code:0,message:'服务器出错!'}
    }
  }

  async permission() {
    const ctx = this.ctx;
    try{
      let TOKEN = ctx.request.body.TOKEN;
      let tokens = this.app.jwt.verify(TOKEN).name
      let id = tokens.split('\t')[3];
      const managers = await ctx.model.Managers.findByPk(id)
      let role_id = managers.role_id
      const role_permissions = await ctx.model.RolePermissions.findAll({where:{role_id}})
      ctx.body = {code:200,message:role_permissions}
    }catch(e){
      ctx.body = {code:0,message:'权限服务器错误!'}
    }
  }
}

module.exports = ManageController;