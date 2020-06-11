const Controller = require('egg').Controller;

class StorieController extends Controller {
  async index() {
    const ctx = this.ctx;
    try{
      let project_id = ctx.params.id;
      const Stories = await ctx.model.Stories.findAll({where:{project_id}})
      const tasks = await ctx.model.Tasks.findAll({where:{project_id}})
      let storie = [];
      Stories.forEach(data => {
        data.dataValues.tasks = []
        storie.push(data.dataValues)
      });
      tasks.forEach(data => {
        let story_id = data.dataValues.story_id;
        storie.forEach((datas,index) => {
          if(story_id === datas.id){
            storie[index].tasks.push(data.dataValues)
          }
        })
      })
      ctx.body = {code:200,message:storie}
    }catch(e){
      ctx.body = {code:0,message:'服务器出错!'}
    }
  }

  async created() {
    const ctx = this.ctx;
    try{
      let project_id = ctx.request.body.project_id;
      let name = ctx.request.body.name;
      let content = ctx.request.body.content;
      let created_at = new Date();
      if(!name || !content){
        ctx.body = {code:0,message:'缺少必要参数!'}
        return
      }
      await ctx.model.Stories.create({project_id,name,content,created_at})
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
      let content = ctx.request.body.content;
      let project_id = ctx.request.body.project_id;
      let updated_at = new Date()
      if(!name || !content){
        ctx.body = {code:0,message:'缺少必要参数!'}
        return
      }
      await ctx.model.Stories.update(
        {name,content,project_id,updated_at},
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
      await ctx.model.Tasks.destroy({where:{story_id:id}})
      await ctx.model.Stories.destroy({where:{id}})
      ctx.body = {code:200,message:'删除成功!'}
    }catch(e){
      ctx.body = {code:0,message:'服务器错误!'}
    }
  }
}

module.exports = StorieController