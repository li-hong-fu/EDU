const Controller = require('egg').Controller;

class MaterialController extends Controller {
  async index() {
    const ctx = this.ctx;
    try{
      const material = await ctx.model.Materials.findAll()
      console.log(material)
      ctx.body = {code:200,message:material}
    }catch(e){
      ctx.body = {code:0,message:e}
    }
  }

  async created() {
    const ctx = this.ctx;
    try{
      let name = ctx.request.body.name;
      let jump_link = ctx.request.body.jump_link;
      let open = ctx.request.body.open;
      let image_url = ctx.request.body.image_url;
      let created_at = new Date()
      if(!name || !jump_link || !open || !image_url){
        ctx.body = {code:0,message:"请填写物料详情"}
        return
      }
      await ctx.model.Materials.create({name,jump_link,open,image_url,created_at})
      ctx.body = {code:200,message:"物料添加成功!"}
    }catch(e){
      ctx.body = {code:0,message:e}
    }
  }

  async indexItem() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      const material = await ctx.model.Materials.findByPk(id)
      ctx.body = {code:200,message:material}
    }catch(e){
      ctx.body = {code:0,message:e}
    }
  }

  async updated() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      let name = ctx.request.body.name;
      let jump_link = ctx.request.body.jump_link;
      let open = ctx.request.body.open;
      let image_url = ctx.request.body.image_url;
      let updated_at = new Date()
      if(!name || !jump_link || !open || !image_url){
        ctx.body = {code:0,message:"请填写物料详情"}
        return
      }
      await ctx.model.Materials.update(
        {name,jump_link,open,image_url,updated_at},
        {where:{id}}
      )
      ctx.body = {code:200,message:"物料编辑成功!"}
    }catch(e){
      ctx.body = {code:0,message:e}
    }
  }

  async delete() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      await ctx.model.Materials.destroy({where:{id}})
      ctx.body = {code:200,message:"删除成功!"}
    }catch(e){
      ctx.body = {code:0,message:e}
    }
  }
}

module.exports = MaterialController