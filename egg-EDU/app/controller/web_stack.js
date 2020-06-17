const Controller = require('egg').Controller;

class webStackController extends Controller {
  async index() {
    const ctx = this.ctx;
    try{
      const stacks = await ctx.model.Stack.findAll()
      
      let stack = []
      stacks.forEach(data => {
        if(data.status == 1){
          stack.push(data)
        }
      });
      ctx.body = {code:200,message:stack}
    }catch(e){
      ctx.body = {code:0,message:"服务器出错"}
    }
  }

  async indexItem() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      let number = ctx.request.query.pageSize - 1;
      const stacks = await ctx.model.Stack.findByPk(id)
      const questions = await ctx.model.SkillQuestions.findAll({
        where:{stack_id:id}
      })
      let ArrQuestion = [];
      let arrLength = questions.length;
      
      for (let i = 0; i < 20; i++) {
        let index = parseInt(Math.random() * arrLength)
        ArrQuestion.push(questions[index])
      }
      let total = ArrQuestion.length;
      ctx.body = {code:200,message:ArrQuestion[number],stacks,total}
    }catch(e){
      ctx.body = {code:0,message:'服务器出错'}
    }
  }
}

module.exports = webStackController