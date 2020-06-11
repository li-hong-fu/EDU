const Controller = require('egg').Controller;

class VersionController extends Controller {
  async index() {
    const ctx = this.ctx;
    try{
      let project_id = ctx.params.id;
      const versions = await ctx.model.Versions.findAll({where:{project_id}})
      ctx.body = {code:200,message:versions}
    }catch(e){
      ctx.body = {code:0,message:'服务器出错!'}
    }
  }

  async created() {
    const ctx = this.ctx;
    try{
      let project_id = ctx.request.body.project_id;
      let name = ctx.request.body.name;
      let created_at = new Date()
      if(!name){
        ctx.body = {code:0,message:'缺少必要参数!'}
        return
      }
      await ctx.model.Versions.create({project_id,name,created_at})
      ctx.body = {code:200,message:'添加成功!'}
    }catch(e){
      ctx.body = {code:0,message:'服务器出错!'}
    }
  }

  async updated() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      let project_id = ctx.request.body.project_id;
      let name = ctx.request.body.name;
      let updated_at = new Date()
      if(!name){
        ctx.body = {code:0,message:'缺少必要参数!'}
        return
      }
      await ctx.model.Versions.update(
        {project_id,name,updated_at},
        {where:{id}}
      )
      ctx.body = {code:200,message:'编辑成功!'}
    }catch(e){
      ctx.body = {code:0,message:'服务器错误!'}
    }
  }

  async delete() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      await ctx.model.Versions.destroy({where:{id}})
      ctx.body = {code:200,message:'删除成功!'}
    }catch(e){
      ctx.body = {code:0,message:'服务器错误!'}
    }
  }

  async sort() {
    const ctx = this.ctx;
    try{
      let versions = ctx.request.body.versions;
      versions.map(async(data,index) => {
        await ctx.model.Versions.update(
          {sort:index},
          {where:{id:data.id}}
        )
      })
      ctx.body = {code:200,message:'排序完成!'}
    }catch(e){
      ctx.body = {code:0,message:'服务器错误!'}
    }
  }
}

module.exports = VersionController