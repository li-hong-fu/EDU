const Controller = require('egg').Controller;

class TasksController extends Controller {
  async created() {
    const ctx = this.ctx;
    try{
      let name = ctx.request.body.value;
      let story_id = ctx.request.body.story_id;
      let project_id = ctx.request.body.project_id;
      let created_at = new Date()
      if(!name){
        ctx.body = {code:0,message:'缺少必要参数!'}
        return
      }
      await ctx.model.Tasks.create({name,story_id,project_id,created_at})
      ctx.body = {code:200,message:"添加成功!"}
    }catch(e){
      ctx.body = {code:0,message:'服务器错误!'}
    }
  }

  async updated() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      let name = ctx.request.body.name;
      let level = ctx.request.body.level;
      let platform = ctx.request.body.platform;
      let content = ctx.request.body.content;
      let updated_at = new Date()
      if(!name || !level || !platform || !content){
        ctx.body = {code:0,message:'缺少必要参数!'}
        return
      }
      await ctx.model.Tasks.update(
        {name,level,platform,content,updated_at},
        {where:{id}}
      )
      ctx.body = {code:200,message:'修改成功!'}
    }catch(e){
      ctx.body = {code:0,message:'服务器出错!'}
    }
  }

  async delete() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      await ctx.model.Tasks.destroy({where:{id}})
      ctx.body = {code:200,message:'删除成功!'}
    }catch(e){
      ctx.body = {code:0,message:'服务器出错!'}
    }
  }

  async sort() {
    const ctx = this.ctx;
    try{
      let stories = ctx.request.body.stories;
      stories.map(async(data,index)=> {
        await ctx.model.Stories.update(
          {sort:index},
          {where:{id:data.id}}
        )
        data.tasks.map(async(datas,indexs)=>{
          await ctx.model.Tasks.update(
            {sort:indexs,story_id:data.id},
            {where:{id:datas.id}}
          )
        })
        console.log(data.tasks)
      })
      ctx.body = {code:200,message:'排序完成!'}
    }catch(e){
      ctx.body = {code:0,message:'服务器出错!'}
    }
  }
}

module.exports = TasksController