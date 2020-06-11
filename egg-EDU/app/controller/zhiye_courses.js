const Controller = require('egg').Controller;

class ZhiyeCourseController extends Controller {
  async created() {
    const { ctx } = this;
    try{
      let zhiye_id = ctx.request.body.zhiye_id;
      let path_id = ctx.request.body.path_id;
      let id = ctx.request.body.value;
      const courses = await ctx.model.Course.findByPk(id)
      if(!courses){
        ctx.body = {code:0,message:"没有这个课程ID"}
        return
      }
      await ctx.model.ZhiyeCourses.create({zhiye_id,path_id,course_id:id})
      ctx.body = {code:200,message:'关联成功!'}
    }catch(e){
      ctx.body = {code:0,message:'关联失败!'}
    }
  }

  async delete() {
    const { ctx } = this;
    try{
      let id = ctx.params.id;
      await ctx.model.ZhiyeCourses.destroy({where:{id}})
      ctx.body = {code:200,message:'删除成功!'}
    }catch(e){
      ctx.body = {code:0,message:'删除失败!'}
    }
  }

  async sort() {
    const { ctx } = this;
    try{
      let zhiye_path = ctx.request.body.zhiye_path;
      zhiye_path.map(async(data,index) => {
        console.log(data)
        await ctx.model.ZhiyePath.update(
          {sort:index},
          {where:{id:data.id}}
        )
        data.course.map(async(datas,indexs)=> {
          await ctx.model.ZhiyeCourses.update(
            {sort:indexs,path_id:data.id},
            {where:{id:datas.id}}
          )
        })
      })
      ctx.body = {code:200,message:'排序完成!'}
    }catch(e){
      ctx.body = {code:0,message:'服务器发生错误!'}
    }
  }
}

module.exports = ZhiyeCourseController;