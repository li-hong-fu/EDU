const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class CourseController extends Controller {
  async index() {
    const ctx = this.ctx
    try{
      const Courses = await ctx.model.Course.findAll()
      ctx.body = { code:200,message:Courses}
    }catch(e){
      ctx.body = { code:0,message:'获取失败!' }
    }
  }

  async courseCreate() {
    const ctx = this.ctx
    try{
      let name = ctx.request.body.name;
      let short_name = ctx.request.body.short_name;
      let tips = ctx.request.body.tips;
      let description = ctx.request.body.description;
      let image_url = ctx.request.body.image_url;
      let created_at = new Date();
      let status = 0;

      if(!name || !short_name || !tips || !description || !image_url){
        ctx.body = {code:0,message:'缺少必要参数!'}
        return
      }
      
      await ctx.model.Course.create({name,short_name,tips,description,image_url,created_at,status})
      ctx.body = {code:200,message:'成功'}
    }catch(e){
      ctx.body = {code:0,message:'添加失败!'}
    }
  }

  async courseShow() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id
      const courses = await ctx.model.Course.findByPk(id)
      ctx.body = {code:200,message:courses}
    }catch(e){
      ctx.body = {code:0,message:'获取失败!'}
    }
  }

  async courseEdit() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      let name = ctx.request.body.name;
      let short_name = ctx.request.body.short_name;
      let tips = ctx.request.body.tips;
      let description = ctx.request.body.description;
      let image_url = ctx.request.body.image_url;

      if(!name || !short_name || !tips || !description || !image_url){
        ctx.body = {code:0,message:"缺少必要参数!"}
        return
      }

      const courses = await ctx.model.Course.findByPk(id)
      const updated_at = new Date()

      await courses.update({name,short_name,tips,description,image_url,updated_at})
      ctx.body = {code:200,message:'编辑成功!'}
    }catch(e){
      ctx.body = {code:0,message:'编辑失败!'}
    }
  }

  async courseDetele() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id
      const chapters = await ctx.model.CourseChapter.findAll({where:{course_id:id}})
      let chapter_id = chapters.map(data => data.dataValues.id)
      await ctx.model.CourseSection.destroy({where:{chapter_id}})
      await ctx.model.Course.destroy({where:{id}})
      await ctx.model.CourseChapter.destroy({where:{course_id:id}})
      
      ctx.body = {code:200,message:"删除成功!"}
    }catch(e){
      ctx.body = {code:0,message:'删除失败!'}
    }
  }
}

module.exports = CourseController;