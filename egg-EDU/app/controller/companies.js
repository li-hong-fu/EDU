const Controller = require('egg').Controller;

class CompanieController extends Controller {
  async index() {
    const ctx = this.ctx;
    try{
      const companies = await ctx.model.Companies.findAll()
      ctx.body = {code:200,message:companies}
    }catch(e){
      ctx.body = {code:0,message:"获取失败!"}
    }
  }

  async indexItem() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      const companies = await ctx.model.Companies.findByPk(id)
      ctx.body = {code:200,message:companies}
    }catch(e){
      ctx.body = {code:0,message:"获取失败!"}
    }
  }

  async create() {
    const ctx = this.ctx;
    try{
      let name = ctx.request.body.name;
      let short_name = ctx.request.body.short_name;
      let slogan = ctx.request.body.slogan;
      let code = ctx.request.body.code;
      let contact_name = ctx.request.body.contact_name;
      let contact_phone = ctx.request.body.contact_phone;
      let introduction = ctx.request.body.introduction;
      let image_url = ctx.request.body.image_url;
      let created_at = new Date()
      if(!name || !short_name || !slogan || !code || !contact_name || !contact_phone || !introduction || !image_url){
        ctx.body = {code:0,message:"缺少必要参数!"}
        return
      }
      await ctx.model.Companies.create({name,short_name,slogan,code,contact_name,contact_phone,introduction,image_url,created_at})
      ctx.body = {code:200,message:"添加成功!"}
    }catch(e){
      ctx.body = {code:0,message:"添加失败!"}
    }
  }

  async updated() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      let name = ctx.request.body.name;
      let short_name = ctx.request.body.short_name;
      let slogan = ctx.request.body.slogan;
      let code = ctx.request.body.code;
      let contact_name = ctx.request.body.contact_name;
      let contact_phone = ctx.request.body.contact_phone;
      let introduction = ctx.request.body.introduction;
      let image_url = ctx.request.body.image_url;
      let updated_at = new Date()
      if(!name || !short_name || !slogan || !code || !contact_name || !contact_phone || !introduction || !image_url){
        ctx.body = {code:0,message:"缺少必要参数!"}
        return
      }
      await ctx.model.Companies.update(
        {name,short_name,slogan,code,contact_name,contact_phone,introduction,image_url,updated_at},
        {where:{id}}
      )
      ctx.body = {code:200,message:"编辑成功!"}
    }catch(e){
      ctx.body = {code:0,message:"服务器出错!"}
    }
  }

  async delete() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      await ctx.model.Companies.destroy({where:{id}})
      ctx.body = {code:200,message:"删除成功!"}
    }catch(e){
      ctx.body = {code:0,message:"服务器出错!"}
    }
  }
}

module.exports = CompanieController