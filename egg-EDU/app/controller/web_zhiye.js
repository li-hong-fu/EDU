const Controller = require('egg').Controller;

class WebZhiYeController extends Controller {
  async index() {
    const ctx = this.ctx;
    try{
      const zhiyes = await ctx.model.Zhiye.findAll();
      ctx.body = {code:200,message:zhiyes}
    }catch(e){
      ctx.body = {code:0,message:'服务器错误'}
    }
  }

  async indexItem() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      const zhiyes = await ctx.model.Zhiye.findByPk(id);
      const zhiyePath = await ctx.model.ZhiyePath.findAll({where:{zhiye_id:id}})
      ctx.body = {code:200,message:zhiyes,zhiyePath}
    }catch(e){
      ctx.body = {code:0,message:"服务器出错"}
    }
  }
}

module.exports = WebZhiYeController