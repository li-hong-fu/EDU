const Controller = require('egg').Controller;

class ChapterController extends Controller {
  async create() {
    const ctx = this.ctx;
    try{
      let course_id = ctx.request.body.course_id;
      let name = ctx.request.body.value;
      let created_at = new Date()

      if(!name){
        ctx.body = {code:0,message:'缺少必要参数!'}
        return
      }
      const chapters = await ctx.model.CourseChapter.create({course_id,name,created_at})
      ctx.body = {code:200,message:chapters}
    }catch(e){
      ctx.body = {code:0,message:'获取失败!'}
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
      const chapters = await ctx.model.CourseChapter.findByPk(id)
      await chapters.update({name,updated_at})
      ctx.body = {code:200,message:"编辑成功!"}
    }catch(e){
      ctx.body = {code:0,message:"编辑错误!"}
    }
  }

  async delete() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      await ctx.model.CourseChapter.destroy({where: {id}});
      await ctx.model.CourseSection.destroy({where:{chapter_id:id}});
      ctx.body = {code:200,message:"删除成功!"}
    }catch(e){
      ctx.body = {code:0,message:"删除失败!"}
    }
  }

  async sort() {
    const ctx = this.ctx;
    try{
      let chapter = ctx.request.body.chapter;
      chapter.map(async(data,index) => {
        await ctx.model.CourseChapter.update(
          {sort:index},
          {where:{id:data.id}}
        )

        data.section.map(async(datas,indexs) => {
          await ctx.model.CourseSection.update(
            {sort:indexs,chapter_id:data.id},
            {where:{id:datas.id}}
          )
        })
      })
      ctx.body = {code:200,message:"排序成功!"}
    }catch(e){
      ctx.body ={code:0,message:"排序失败!"}
    }
  }
}

module.exports = ChapterController;