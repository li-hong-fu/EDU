'use strict';

const Controller = require('egg').Controller;

class StackController extends Controller {
  async index() {
    const { ctx } = this;
    try{
      const Stacks = await ctx.model.Stack.findAll()
      ctx.body = {code:200,message:Stacks}
    }catch(e){
      ctx.body = {code:0,message:'获取失败!'}
    }
  }

  async create() {
    const { ctx } = this;
    try{
      let name = ctx.request.body.name
      let tag_line = ctx.request.body.tag_line
      let description = ctx.request.body.description
      let image_url = ctx.request.body.image_url

      if(!name || !tag_line || !description){
        ctx.body = {code:0,message:'必须添加参数!'}
        return
      }

      const Stacks = await ctx.model.Stack.create({name,tag_line,description,image_url})
      
      ctx.body = {code:200,message:Stacks}
    }catch(e){
      ctx.body = {code:0,message:'添加失败!'}
    }
  }
  
  async getStack() {
    const { ctx } = this;
    try{
      let id = ctx.params.id
      const Stacks = await ctx.model.Stack.findByPk(id)
      ctx.body = {code:200,message:Stacks}
    }catch(e){
      ctx.body = {code:0,message:'发生错误!'}
    }
  }

  async editStack() {
    const { ctx } = this;
    try{
      let id = ctx.params.id
      const Stacks = await ctx.model.Stack.findByPk(id)
      if (!Stacks) {
        ctx.status = 404;
        return;
      }
      const { name, tag_line, description, image_url } = ctx.request.body;
      const updated_at = new Date()
      await Stacks.update({ name, tag_line, description, image_url, updated_at});
      ctx.body = {code:200,message:'修改成功!'}
    }catch(e){
      ctx.body = {code:0,message:'发生错误!'}
    }
  }

  async deleteStack() {
    const { ctx } = this;
    try{
      let id = ctx.params.id
      const Stacks = await ctx.model.Stack.findByPk(id)
      if (!Stacks) {
        ctx.status = 404;
        return;
      }
      await Stacks.destroy();

      ctx.body = {code:200,message:Stacks}
    }catch(e){
      ctx.body = {code:0,message:'发生错误!'}
    }
  }
}

module.exports = StackController;
