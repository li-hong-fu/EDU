const Controller = require('egg').Controller;

class webIndexController extends Controller {
  async course() {
    const ctx = this.ctx;
    try{
      const Courses = await ctx.model.Course.findAll();
      ctx.body = { code:200,message:Courses}
    }catch(e){
      ctx.body = {code:0,message:e}
    }
  }

  async courseItem() {
    const ctx = this.ctx;
    try{
      let course_id = ctx.params.id
      const course = await ctx.model.Course.findAll({where:{id:course_id}})
      const chapters = await ctx.model.CourseChapter.findAll({where:{course_id}})
      let chapter_id = chapters.map(data => data.dataValues.id)
      const sections = await ctx.model.CourseSection.findAll({where:{chapter_id}})

      let chapter = []
      chapters.forEach(data => {
        data.dataValues.section = []
        chapter.push(data.dataValues)
      });
      
      sections.forEach(data => {
        let id = data.dataValues.chapter_id
        chapter.forEach((datas,index) => {
          if(datas.id === id){
            chapter[index].section.push(data.dataValues)
          }
        })
      })
      ctx.body = {code:200,course,chapter}
    }catch(e){
      ctx.body = {code:0,message:e}
    }
  }

  async courseItemVideo() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      const courseSection = await ctx.model.CourseSection.findByPk(id)
      ctx.body = {code:200,message:courseSection}
    }catch(e){
      ctx.body = {code:0,message:'发生错误'}
    }
  }
}

module.exports = webIndexController