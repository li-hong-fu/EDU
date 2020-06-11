const Controller = require('egg').Controller;

class SectionController extends Controller {
  async index() {
    const ctx = this.ctx;
    try{
      console.log(ctx.params.id)
      let course_id = ctx.params.id
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
      ctx.body = {code:200,message:chapter}
    }catch(e){
      ctx.body = {code:0,message:'获取失败!'}
    }
  }
  
  async create() {
    const ctx = this.ctx;
    try{
      let chapter_id = ctx.request.body.id;
      let name = ctx.request.body.name;
      let video_url = ctx.request.body.video_url;
      let content = ctx.request.body.content;
      let created_at = new Date()
      if(!name || !video_url || !content){
        ctx.body = {code:0,message:"缺少必要参数!"}
        return
      }
      await ctx.model.CourseSection.create({chapter_id,name,video_url,content,created_at})
      ctx.body = {code:200,message:"添加成功!"}
    }catch(e){
      ctx.body = {code:0,message:"添加失败!"}
    }
  }

  async update() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      let name = ctx.request.body.name;
      let updated_at = new Date()
      if(!name){
        ctx.body = {code:0,message:"缺少必要参数!"}
        return
      }
      const sections =  await ctx.model.CourseSection.findByPk(id)
      await sections.update({name,updated_at})
      ctx.body = {code:200,message:"编辑成功!"}
    }catch(e){
      ctx.body = {code:0,message:"编辑失败!"}
    }
  }

  async delete() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      await ctx.model.CourseSection.destroy({where:{id}})
      ctx.body = {code:200,message:"删除成功!"}
    }catch(e){
      ctx.body = {code:0,message:"删除失败!"}
    }
  }
}

module.exports = SectionController;