const Controller = require('egg').Controller;

class QuestionsController extends Controller {
  async index() {
    const ctx = this.ctx;
    try{
      let currentPage = ctx.request.query.currentPage || 1;
      let pageSize = ctx.request.query.pageSize || 20;
      let offset = (currentPage - 1) * pageSize;
      const questions = await ctx.model.SkillQuestions.findAll({
        offset,
        limit:parseInt(pageSize)
      });
      const question = await ctx.model.SkillQuestions.findAll();
      const stack = await ctx.model.Stack.findAll()
      let skill_question = []
      questions.forEach(data => {
        data.dataValues.stack_name = null
        skill_question.push(data.dataValues)
      });
      stack.forEach(data => {
        let id = data.dataValues.id
        skill_question.forEach((datas,index) => {
          if(datas.stack_id === id){
            skill_question[index].stack_name = data.dataValues.name
          }
        })
      })
      let total = question.length;
      ctx.body = {code:200,message:skill_question,total}
    }catch(e){
      ctx.body = {code:0,message:'服务器错误'}
    }
  }

  async create() {
    const { ctx } = this;
    try{
      let stem = ctx.request.body.stem
      let stack_id = ctx.request.body.stack_id
      let level = ctx.request.body.level_id
      let correct = ctx.request.body.correct_index
      let option = ctx.request.body.option
      let created_at = new Date()
      const question = await ctx.model.SkillQuestions.create({
        stem, stack_id, level, correct, option, created_at
      })
      console.log(option)
      ctx.body = {code:200,message:question}
    }catch(e){
      ctx.body = {code:0,message:'发生错误啦!'}
    }
  }

  async getQuestion() {
    const { ctx } = this;
    try{
      let id = ctx.params.id
      const question = await ctx.model.SkillQuestions.findByPk(id)
      ctx.body = {code:200,message:question}
    }catch(e){
      ctx.body = {code:0,message:"发生错误!"}
    }
  }

  async editQuestion() {
    const { ctx } = this;
    try{
      let id = ctx.params.id
      const question = await ctx.model.SkillQuestions.findByPk(id)

      if (!question) {
        ctx.status = 404;
        return;
      }
      
      const { stem, stack_id, level, option, correct } = ctx.request.body;
      const updated_at = new Date()
      await question.update({ stem, stack_id, level, option, correct, updated_at })
      ctx.body = {code:200,message:"好了!"}
    }catch(e){
      ctx.body = {code:0,message:"报错了!"}
    }
  }

  async deleteQuestion() {
    const { ctx } = this;
    try{
      let id = ctx.params.id
      const question = await ctx.model.SkillQuestions.findByPk(id)
      if (!question) {
        ctx.status = 404;
        return;
      }

      await question.destroy()

      ctx.body = {code:200,message:'删除掉了!'}
    }catch(e){
      ctx.body = {code:0,message:'代码写错!'}
    }
  }

  
}

module.exports = QuestionsController;