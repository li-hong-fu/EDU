const Controller = require('egg').Controller;

class ZhiyeController extends Controller {
  async index() {
    const { ctx } = this;
    try{
      const zhiyes = await ctx.model.Zhiye.findAll()
      ctx.body = {code:200,message:zhiyes}
    }catch(e){
      ctx.body = {code:0,message:"获取失败!"}
    }
  }

  async indexItem() {
    const { ctx } = this;
    try{
      let id = ctx.params.id;
      const zhiyes = await ctx.model.Zhiye.findByPk(id)
      ctx.body = {code:200,message:zhiyes}
    }catch(e){
      ctx.body = {code:0,message:"获取错误!"}
    }
  }

  async create() {
    const { ctx } = this;
    try{
      console.log(ctx.request.body)
      let name = ctx.request.body.name;
      let description = ctx.request.body.description;
      let image_url = ctx.request.body.image_url;
      let created_at = new Date();
      if(!name || !description || !image_url){
        ctx.body = {code:0,message:"缺少必要参数!"}
        return
      }
      await ctx.model.Zhiye.create({name,description,image_url,created_at})
      ctx.body = {code:200,message:"添加成功!"}
    }catch(e){
      ctx.body = {code:0,message:"添加失败!"}
    }
  }

  async update() {
    const { ctx } = this;
    try{
      let id = ctx.params.id;
      let name = ctx.request.body.name;
      let description = ctx.request.body.description;
      let image_url = ctx.request.body.image_url;
      let updated_at = new Date()

      if(!name || !description || !image_url){
        ctx.body = {code:0,message:"缺少必要参数!"}
        return
      }
      await ctx.model.Zhiye.update(
        {name,description,image_url,updated_at},
        {where:{id}}
      )
      ctx.body = {code:200,message:"编辑成功!"}
    }catch(e){
      ctx.body = {code:0,message:"编辑失败!"}
    }
  }

  async delete() {
    const { ctx } = this;
    try{
      let id = ctx.params.id;
      await ctx.model.ZhiyeCourses.destroy({where:{zhiye_id:id}})
      await ctx.model.ZhiyePath.destroy({where:{zhiye_id:id}})
      await ctx.model.Zhiye.destroy({where:{id}})
      ctx.body = {code:200,message:"删除成功!"}
    }catch(e){
      ctx.body = {code:0,message:"删除失败!"}
    }
  }
}

module.exports = ZhiyeController;