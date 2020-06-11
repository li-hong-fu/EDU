const Controller = require('egg').Controller;

class AdvertiseController extends Controller {
  async index() {
    const ctx = this.ctx;
    try{
      const advertise = await ctx.model.Advertise.findAll()
      ctx.body = {code:200,message:advertise}
    }catch(e){
      ctx.body = {code:0,message:"广告服务器出错!"}
    }
  }

  async created() {
    const ctx = this.ctx;
    try{
      let name = ctx.request.body.name;
      let slug = ctx.request.body.slug;
      let width = ctx.request.body.width;
      let height = ctx.request.body.height;
      let created_at = new Date()
      if(!name || !slug || !width || !height){
        ctx.body = {code:0,message:"请详细填写广告详情"}
        return
      }
      await ctx.model.Advertise.create(
        {name,slug,width,height,created_at}
      )
      ctx.body = {code:200,message:"成功添加广告!"}
    }catch(e){
      ctx.body = {code:0,message:"广告位出错啦!"}
    }
  }

  async indexItem() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      const advertise = await ctx.model.Advertise.findByPk(id)
      ctx.body = {code:200,message:advertise}
    }catch(e){
      ctx.body = {code:0,message:"获取广告item错误!"}
    }
  }

  async updated() {
   const ctx = this.ctx;
   try{
     let id = ctx.params.id;
     let name = ctx.request.body.name;
     let slug = ctx.request.body.slug;
     let width = ctx.request.body.width;
     let height = ctx.request.body.height;
     let updated_at = new Date()
     if(!name || !slug || !width || !height){
       ctx.body = {code:0,message:"所有填项不能为空!"}
       return
     }
     await ctx.model.Advertise.update(
       {name,slug,width,height,updated_at},
       {where:{id}}
     )
     ctx.body = {code:200,message:"广告修改成功!"}
   }catch(e){
     ctx.body ={code:0,message:"广告修改服务器出错!"}
   }
  }

  async delete() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      await ctx.model.AdvertiseMaterial.destroy({where:{advertise_id:id}})
      await ctx.model.Advertise.destroy({where:{id}})
      ctx.body = {code:200,message:"广告删除完成!"}
    }catch(e){
      ctx.body = {code:0,message:e}
    }
  }

  async addMaterial() {
    const ctx = this.ctx;
    try{
      let advertise_id = ctx.request.body.id;
      let materiel_id = ctx.request.body.value;
      const materiel = await ctx.model.Materials.findAll({where:{id:materiel_id}})
      const advertiseMaterial = await ctx.model.AdvertiseMaterial.findAll({where:{advertise_id}})
      if(materiel.length <= 0){
        ctx.body = {code:0,message:"没有这个广告ID"}
        return
      }
      let state = advertiseMaterial.some(data => data.materiel_id == materiel_id)
      if(state){
        ctx.body = {code:0,message:"这个广告ID已添加过了"}
        return
      }
      
      await ctx.model.AdvertiseMaterial.create({advertise_id,materiel_id})
      ctx.body = {code:200,message:"成功关联广告!"}
    }catch(e){
      ctx.body = {code:0,message:e}
    }
  }

  async showMaterial() {
    const ctx = this.ctx;
    try{
      let advertise_id = ctx.params.id;
      const advertiseMaterial = await ctx.model.AdvertiseMaterial.findAll({where:{advertise_id}})
      let materiel_ids = advertiseMaterial.map(data => data.materiel_id)
      const materiel = await ctx.model.Materials.findAll({where:{id:materiel_ids}})
      let materials = []
      advertiseMaterial.forEach(element => {
        element.dataValues.materiel_name = null
        materials.push(element.dataValues)
      });
      materiel.forEach(data => {
        let id = data.dataValues.id
        advertiseMaterial.forEach((datas,index)=> {
          if(datas.dataValues.materiel_id === id){
            materials[index].materiel_name = data.dataValues.name
          }
        })
      })
      ctx.body = {code:200,message:materials}
    }catch(e){
      ctx.body = {code:0,message:e}
    }
  }

  async deleteMaterial() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      await ctx.model.AdvertiseMaterial.destroy({where:{id}})
      ctx.body = {code:200,message:"广告删除成功!"}
    }catch(e){
      ctx.body = {code:0,message:"广告删除错误!"}
    }
  }

  async sort() {
    const ctx = this.ctx;
    try{
      let material = ctx.request.body.material;
      console.log(material)
      material.map(async(data,index)=>{
        await ctx.model.AdvertiseMaterial.update(
          {sort:index},
          {where:{id:data.id}}
        )
      })
      ctx.body = {code:200,messge:"排序完成"}
    }catch(e){
      ctx.body = {code:0,message:e}
    }
  }
}

module.exports = AdvertiseController