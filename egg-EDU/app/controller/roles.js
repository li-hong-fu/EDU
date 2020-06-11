const Controller = require('egg').Controller;

class RoleController extends Controller {
  async index() {
    const ctx = this.ctx;
    try{
      const roles = await ctx.model.Roles.findAll()
      ctx.body = {code:200,message:roles}
    }catch(e){
      ctx.body = {code:0,message:'角色列表服务器出错!'}
    }
  }

  async permission() {
    const ctx = this.ctx;
    try{
      const PermissionGroups = await ctx.model.PermissionGroups.findAll()
      const Permission = await ctx.model.Permissions.findAll()
      let PermissionGroup = []
      PermissionGroups.forEach(element => {
        element.dataValues.permission = []
        PermissionGroup.push(element.dataValues)
      });

      Permission.forEach(data => {
        let group_id = data.dataValues.group_id;
        PermissionGroup.forEach((datas,index) => {
          if(group_id === datas.id){
            PermissionGroup[index].permission.push(data)
          }
        })
      })
      ctx.body = {code:200,message:PermissionGroup}
    }catch(e){
      ctx.body = {code:0,message:'权限渲染服务器出错!'}
    }
  }

  async created() {
    const ctx = this.ctx;
    try{
      let name = ctx.request.body.name;
      let description = ctx.request.body.description;
      let permission = ctx.request.body.permissions;
      let permission_slug = permission.toString();
      let created_at = new Date();
      if(!name || !description){
        ctx.body = {code:0,message:'缺少必要参数!'}
        return
      }
      const roles = await ctx.model.Roles.create({name,description,created_at})
      let role_id = roles.dataValues.id
      await ctx.model.RolePermissions.create({role_id,permission_slug})
      // permission.map(async(data)=> {
      //   let permission_slug = data
      //   await ctx.model.RolePermissions.create({role_id,permission_slug})
      // })
      ctx.body = {code:200,message:"新建角色成功"}
    }catch(e){
      ctx.body = {code:0,message:'角色新建服务器出错!'}
    }
  }

  async indexItem() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      const roles = await ctx.model.Roles.findByPk(id)
      const permission_slug = await ctx.model.RolePermissions.findAll({where:{role_id:id}})
      ctx.body = {code:200,roles,permission_slug}
    }catch(e){
      ctx.body = {code:0,message:'角色获取服务器错误!'}
    }
  }

  async updated() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      let name = ctx.request.body.name;
      let description = ctx.request.body.description;
      let permission = ctx.request.body.permissions;
      let permission_slug = permission.toString();
      let updated_at = new Date();

      if(!name || !description || !permission_slug){
        ctx.body = {code:0,message:'缺少参数!'}
        return
      }
      await ctx.model.Roles.update(
        {name,description,updated_at},
        {where:{id}}
      )
      await ctx.model.RolePermissions.update(
        {permission_slug},
        {where:{role_id:id}}
      )
      ctx.body = {code:200,message:'角色编辑成功!'}
    }catch(e){
      ctx.body = {code:0,message:'角色编辑服务器错误!'}
    }
  }

  async delete() {
    const ctx = this.ctx;
    try{
      let id = ctx.params.id;
      await ctx.model.Roles.destroy({where:{id}})
      await ctx.model.RolePermissions.destroy({where:{role_id:id}})
      ctx.body = {code:200,message:'角色删除成功!'}
    }catch(e){
      ctx.body = {code:0,message:'角色删除服务器错误!'}
    }
  }
}

module.exports = RoleController