const BasicLayout = () =>
  import(/* webpackChunkName: "BasicLayout" */ "@/components/BasicLayout.vue");
const Login = () =>
  import(/* webpackChunkName: "BasicLayout" */ "@/views/Login.vue");
const Index = () =>
  import(/* webpackChunkName: "BasicLayout" */ "@/views/Index.vue");
const Occupation = () =>
  import(/* webpackChunkName: "BasicLayout" */ "@/views/Occupation.vue");
const Project = () =>
  import(/* webpackChunkName: "BasicLayout" */ "@/views/Project.vue");
const Skill = () =>
  import(/* webpackChunkName: "BasicLayout" */ "@/views/Skill.vue");
const UserInfo = () =>
  import(/* webpackChunkName: "BasicLayout" */ "@/components/BasicLayoutUser.vue");
const UserEdit = () =>
  import(/* webpackChunkName: "BasicLayout" */ "@/views/UserEdit.vue");
const UserSecurity = () =>
  import(/* webpackChunkName: "BasicLayout" */ "@/views/UserSecurity.vue");

export default [
  {
    path:"/login",
    name:"Login",
    component:Login
  },
  {
    path: "/api",
    name: "BasicLayout",
    component: BasicLayout,
    children:[
      {
        path:"/api/index",
        name:"Index",
        component:Index,
        meta: {
          nav: {
            title: "首页"
          }
        },
      },
      {
        path:"/api/occupation",
        name:"Occupation",
        component:Occupation,
        meta: {
          nav: {
            title: "职业课"
          }
        },
      },
      {
        path:"/api/project",
        name:"Project",
        component:Project,
        meta: {
          nav: {
            title: "企业项目"
          }
        },
      },
      {
        path:"/api/skill",
        name:"Skill",
        component:Skill,
        meta: {
          nav: {
            title: "技能测评"
          }
        },
      },
      {
        path:"api/user/info",
        name:"UserInfo",
        component:UserInfo,
        children:[
          {
            path:"/api/user/edit",
            name:"UserEdit",
            component:UserEdit,
            meta:{
              info:{
                icon:"el-icon-user-solid",
                title: "个人设置"
              }
            }
          },
          {
            path:"/api/user/security",
            name:"UserSecurity",
            component:UserSecurity,
            meta:{
              info:{
                icon:"el-icon-s-tools",
                title: "账号安全"
              }
            }
          },
        ]
      }
    ]
  }
]