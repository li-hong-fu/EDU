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

  async indexItemCourse() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      const zhiyePath = await ctx.model.ZhiyePath.findAll({where:{id}})
      const ZhiyeCourse = await ctx.model.ZhiyeCourses.findAll({
        where:{path_id:id}
      })
      let course_id = ZhiyeCourse.map(data => data.course_id)
      console.log(course_id)
      const courses = await ctx.model.Course.findAll({where:{id:course_id}})
      ctx.body = {code:200,message:courses,zhiyePath}
    }catch(e){
      ctx.body ={code:0,message:'服务器出错'}
    }
  }
}

module.exports = WebZhiYeController