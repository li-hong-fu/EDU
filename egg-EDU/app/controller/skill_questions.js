const Controller = require('egg').Controller;

class QuestionsController extends Controller {
  async index() {
    const { ctx } = this;
    try{
      const question = await ctx.model.SkillQuestions.findAll()
      const stack = await ctx.model.Stack.findAll()

      let questions = []
      question.forEach(data => {
        data.dataValues.stack_name = null
        questions.push(data.dataValues)
      });

      stack.forEach(data => {
        let id = data.dataValues.id
        questions.forEach((datas,index) => {
          if(datas.stack_id === id){
            questions[index].stack_name = data.dataValues.name
          }
        })
      })

      ctx.body = {code:200,questions,stack}
    }catch(e){
      ctx.body = {code:0,message:'发生错误!'}
    }
  }

  async create() {
    const { ctx } = this;
    try{
      let stem = ctx.request.body.stem
      let stack_id = ctx.request.body.stack_id
      let level = ctx.request.body.level_id
      let currect = ctx.request.body.currect_index
      let option = ctx.request.body.option
      let created_at = new Date()
      const question = await ctx.model.SkillQuestions.create({
        stem, stack_id, level, currect, option, created_at
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
      
      const { stem, stack_id, level, option, currect } = ctx.request.body;
      const updated_at = new Date()
      await question.update({ stem, stack_id, level, option, currect, updated_at })
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