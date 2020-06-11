const Controller = require('egg').Controller;

class ProjectController extends Controller {
  async index() {
    const ctx = this.ctx;
    try{
      const projects = await ctx.model.Projects.findAll()
      ctx.body = {code:200,message:projects}
    }catch(e){
      ctx.body = {code:0,message:'服务器出错!'}
    }
  }

  async indexItem() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      const projects = await ctx.model.Projects.findByPk(id)
      ctx.body = {code:200,message:projects}
    }catch(e){
      ctx.body = {code:0,message:'服务器错误!'}
    }
  }

  async create() {
    const ctx = this.ctx;
    try{
      let name = ctx.request.body.name;
      let description = ctx.request.body.description;
      let image_url = ctx.request.body.image_url;
      let created_at = new Date()
      if(!name || !description || !image_url){
        ctx.body = {code:0,message:'缺少必要参数!'}
        return
      }
      await ctx.model.Projects.create({name,description,image_url,created_at})
      ctx.body = {code:200,message:'添加成功!'}
    }catch(e){
      ctx.body = {code:0,message:'服务器出错!'}
    }
  }

  async updated() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      let name = ctx.request.body.name;
      let description = ctx.request.body.description;
      let image_url = ctx.request.body.image_url;
      let updated_at = new Date()
      if(!name || !description || !image_url){
        ctx.body = {code:0,message:'缺少必要参数!'}
        return
      }
      await ctx.model.Projects.update(
        {name,description,image_url,updated_at},
        {where:{id}}
      )
      ctx.body = {code:200,message:'修改成功!'}
    }catch(e){
      ctx.body = {code:0,message:'服务器错误!'}
    }
  }

  async delete() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      await ctx.model.Tasks.destroy({where:{project_id:id}})
      await ctx.model.Stories.destroy({where:{project_id:id}})
      await ctx.model.Versions.destroy({where:{project_id:id}})
      await ctx.model.Projects.destroy({where:{id}})
      ctx.body = {code:200,message:'删除成功!'}
    }catch(e){
      ctx.body = {code:0,message:'服务器出错!'}
    }
  }
}

module.exports = ProjectController