const Controller = require('egg').Controller;

class ZhiyePathController extends Controller{
  async index() {
    const { ctx } = this;
    try{
      let zhiye_id = ctx.params.id;
      const zhiyePaths = await ctx.model.ZhiyePath.findAll({where:{zhiye_id}})
      const zhiye_course = await ctx.model.ZhiyeCourses.findAll({where:{zhiye_id}})
      let course_id = zhiye_course.map(data => data.course_id)
      const courses = await ctx.model.Course.findAll({where:{id:course_id}})

      let zhiyePath = [];
      zhiyePaths.forEach((element,index) => {
        element.dataValues.course = []
        zhiyePath[index] = element.dataValues
        zhiye_course.forEach(data => {
          if(zhiyePaths[index].id === data.dataValues.path_id){
            let course_ids = data.dataValues.course_id
            courses.forEach(datas => {
              if(course_ids === datas.dataValues.id){
                datas.dataValues.zhiye_courseId = data.id
                zhiyePath[index].course.push(datas)
              }
            })
          }
        })
      });

      ctx.body = {code:200,message:zhiyePath}
    }catch(e){
      ctx.body = {code:0,message:"获取失败!"}
    }
  }

  async create() {
    const { ctx } = this;
    try{
      let name = ctx.request.body.name;
      let description = ctx.request.body.description;
      let zhiye_id = ctx.request.body.zhiye_id;
      let created_at = new Date()
      if(!name || !description){
        ctx.body = {code:0,message:"缺少必要参数!"}
        return
      }
      await ctx.model.ZhiyePath.create({name,description,zhiye_id,created_at})
      ctx.body = {code:200,message:"添加成功!"}
    }catch(e){
      ctx.body = {code:0,message:"添加失败!"}
    }
  }

  async updated() {
    const { ctx } = this;
    try{
      let id = ctx.params.id;
      let name = ctx.request.body.name;
      let description = ctx.request.body.description;
      let updated_at = new Date()
      if(!name || !description){
        ctx.body = {code:0,message:"缺少必要参数!"}
        return
      }
      await ctx.model.ZhiyePath.update(
        {name,description,updated_at},
        {where:{id}}
      )
      ctx.body = {code:200,message:"编辑成功!"}
    }catch(e){
      ctx.body = {code:0,message:"编辑失败!"}
    }
  }

  async delete() {
    const { ctx } = this;
    try{
      let id = ctx.params.id;
      await ctx.model.ZhiyeCourses.destroy({where:{path_id:id}})
      await ctx.model.ZhiyePath.destroy({where:{id}})
      ctx.body = {code:200,message:'删除成功!'}
    }catch(e){
      ctx.body = {code:0,message:'删除失败!'}
    }
  }
}

module.exports = ZhiyePathController;