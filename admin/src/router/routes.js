const BasicLayoutLogin = () =>
  import(
    /* webpackChunkName: "BasicLayoutLogin" */ "@/components/BasicLayoutLogin.vue"
  );
const Login = () => import(/* webpackChunkName: "Login" */ "@/views/Login.vue");
const BasicLayout = () =>
  import(/* webpackChunkName: "BasicLayout" */ "@/components/BasicLayout.vue");
const Stack = () =>
  import(/* webpackChunkName: "Stack" */ "@/views/IndexStack.vue");
const StackCreate = () =>
  import(/* webpackChunkName: "Stack" */ "@/views/IndexStackCreate.vue");
const StackEdit = () =>
  import(/* webpackChunkName: "Stack" */ "@/views/IndexStackEdit.vue");
const Question = () =>
  import(/* webpackChunkName: "Question" */ "@/views/IndexQuestion.vue");
const QuestionCreate = () =>
  import(/* webpackChunkName: "Question" */ "@/views/IndexQuestionCreate.vue");
const QuestionEdit = () =>
  import(/* webpackChunkName: "Question" */ "@/views/IndexQuestionEdit.vue");
const Course = () =>
  import(/* webpackChunkName: "Course" */ "@/views/IndexCourse.vue");
const CourseCreate = () =>
  import(/* webpackChunkName: "Course" */ "@/views/IndexCourseCreate.vue");
const CourseEdit = () =>
  import(/* webpackChunkName: "Course" */ "@/views/IndexCourseEdit.vue");
const ZhiYe = () =>
  import(/* webpackChunkName: "ZhiYe" */ "@/views/IndexZhiYe.vue");
const ZhiYeCreate = () =>
  import(/* webpackChunkName: "ZhiYe" */ "@/views/IndexZhiYeCreate.vue");
const ZhiYeEdit = () =>
  import(/* webpackChunkName: "ZhiYe" */ "@/views/IndexZhiYeEdit.vue");
const Companie = () =>
  import(/* webpackChunkName: "Companie" */ "@/views/IndexCompanie.vue");
const CompanieCreate = () =>
  import(/* webpackChunkName: "Companie" */ "@/views/IndexCompanieCreate.vue");
const CompanieEdit = () =>
  import(/* webpackChunkName: "Companie" */ "@/views/IndexCompanieEdit.vue");
const Project = () =>
  import(/* webpackChunkName: "Project" */ "@/views/IndexProject.vue");
const ProjectCreate = () =>
  import(/* webpackChunkName: "Project" */ "@/views/IndexProjectCreate.vue");
const ProjectEdit = () =>
  import(/* webpackChunkName: "Project" */ "@/views/IndexProjectEdit.vue");
const ProjectContent = () =>
  import(/* webpackChunkName: "Project" */ "@/views/IndexProjectContent.vue");
const Role = () =>
  import(/* webpackChunkName: "Role" */ "@/views/IndexRole.vue");
const RoleCreate = () =>
  import(/* webpackChunkName: "Role" */ "@/views/IndexRoleCreate.vue");
const RoleEdit = () =>
  import(/* webpackChunkName: "Role" */ "@/views/IndexRoleEdit.vue");
const Manager = () =>
  import(/* webpackChunkName: "Manager" */ "@/views/IndexManager.vue");
const ManagerCreate = () =>
  import(/* webpackChunkName: "Manager" */ "@/views/IndexManagerCreate.vue");
const ManagerEdit = () =>
  import(/* webpackChunkName: "Manager" */ "@/views/IndexManagerEdit.vue");
const Index = () => import(/* webpackChunkName: "Index" */ "@/views/Index.vue");
const Advertise = () =>
  import(/* webpackChunkName: "Advertise" */ "@/views/IndexAdvertise.vue");
const AdvertiseCreate = () =>
  import(
    /* webpackChunkName: "Advertise" */ "@/views/IndexAdvertiseCreate.vue"
  );
const AdvertiseEdit = () =>
  import(/* webpackChunkName: "Advertise" */ "@/views/IndexAdvertiseEdit.vue");
const Material = () =>
  import(/* webpackChunkName: "Material" */ "@/views/IndexMaterial.vue");
const MaterialCreate = () =>
  import(/* webpackChunkName: "Material" */ "@/views/IndexMaterialCreate.vue");
const MaterialEdit = () =>
  import(/* webpackChunkName: "Material" */ "@/views/IndexMaterialEdit.vue");

export default [
  {
    path: "/login",
    component: BasicLayoutLogin,
    children: [
      {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
          title: "EDU登录"
        }
      }
    ]
  },
  {
    path: "/",
    name: "Root",
    component: BasicLayout,
    redirect: { name: "StackRoot" },
    children: [
      {
        path: "/is",
        name: "IndexRoot",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            icon: "el-icon-collection-tag",
            title: "前台展示"
          },
          slug: "index"
        },
        children: [
          {
            path: "/is/index",
            name: "Index",
            component: Index,
            meta: {
              nav: {
                icon: "el-icon-paperclip",
                title: "首页"
              },
              slug: "index"
            }
          }
        ]
      },
      {
        path: "/sqb",
        name: "SQBRoot",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            icon: "el-icon-collection-tag",
            title: "技能测评"
          },
          slug: "stacks"
        },
        children: [
          {
            path: "/sqb/stack",
            name: "Stack",
            component: Stack,
            meta: {
              nav: {
                icon: "el-icon-paperclip",
                title: "技能"
              },
              slug: "stacks"
            }
          },
          {
            path: "/sqb/stack/create",
            name: "StackCreate",
            component: StackCreate,
            meta: {
              slug: "stacks"
            }
          },
          {
            path: "/sqb/stack/edit/:id",
            name: "StackEdit",
            component: StackEdit,
            meta: {
              slug: "stacks"
            }
          },
          {
            path: "/sqb/question",
            name: "Question",
            component: Question,
            meta: {
              nav: {
                icon: "el-icon-paperclip",
                title: "题库"
              },
              slug: "question"
            }
          },
          {
            path: "/sqb/question/create",
            name: "QuestionCreate",
            component: QuestionCreate,
            meta: {
              slug: "question"
            }
          },
          {
            path: "/sqb/question/edit/:id",
            name: "QuestionEdit",
            component: QuestionEdit,
            meta: {
              slug: "question"
            }
          }
        ]
      },
      {
        path: "/cop",
        name: "COPRoot",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            icon: "el-icon-collection-tag",
            title: "职业课程"
          },
          slug: "courses"
        },
        children: [
          {
            path: "/cop/course",
            name: "Course",
            component: Course,
            meta: {
              nav: {
                icon: "el-icon-paperclip",
                title: "课程"
              },
              slug: "courses"
            }
          },
          {
            path: "/cop/course/create",
            name: "CourseCreate",
            component: CourseCreate,
            meta: {
              slug: "courses"
            }
          },
          {
            path: "/cop/course/edit/:id",
            name: "CourseEdit",
            component: CourseEdit,
            meta: {
              slug: "courses"
            }
          },
          {
            path: "/cop/zhiye",
            name: "ZhiYe",
            component: ZhiYe,
            meta: {
              nav: {
                icon: "el-icon-paperclip",
                title: "职业"
              },
              slug: "zhiye"
            }
          },
          {
            path: "/cop/zhiye/create",
            name: "ZhiYeCreate",
            component: ZhiYeCreate,
            meta: {
              slug: "zhiye"
            }
          },
          {
            path: "/cop/zhiye/edit/:id",
            name: "ZhiYeEdit",
            component: ZhiYeEdit,
            meta: {
              slug: "zhiye"
            }
          }
        ]
      },
      {
        path: "/epp",
        name: "EPPRoot",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            icon: "el-icon-collection-tag",
            title: "企业项目"
          },
          slug: "companies"
        },
        children: [
          {
            path: "/epp/companie",
            name: "Companie",
            component: Companie,
            meta: {
              nav: {
                icon: "el-icon-paperclip",
                title: "企业"
              },
              slug: "companies"
            }
          },
          {
            path: "/epp/companie/create",
            name: "CompanieCreate",
            component: CompanieCreate,
            meta: {
              slug: "companies"
            }
          },
          {
            path: "/epp/companie/edit/:id",
            name: "CompanieEdit",
            component: CompanieEdit,
            meta: {
              slug: "companies"
            }
          },
          {
            path: "/epp/project",
            name: "Project",
            component: Project,
            meta: {
              nav: {
                icon: "el-icon-paperclip",
                title: "项目"
              },
              slug: "project"
            }
          },
          {
            path: "/epp/project/create",
            name: "ProjectCreate",
            component: ProjectCreate,
            meta: {
              slug: "project"
            }
          },
          {
            path: "/epp/project/edit/:id",
            name: "ProjectEdit",
            component: ProjectEdit,
            meta: {
              slug: "project"
            }
          },
          {
            path: "/epp/project/content/:id",
            name: "ProjectContent",
            component: ProjectContent,
            meta: {
              slug: "project"
            }
          }
        ]
      },
      {
        path: "/atmt",
        name: "Atmt",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            icon: "el-icon-setting",
            title: "广告物料"
          },
          slug: "advertise"
        },
        children: [
          {
            path: "/atmt/advertise",
            name: "Advertise",
            component: Advertise,
            meta: {
              nav: {
                icon: "el-icon-user-solid",
                title: "广告"
              },
              slug: "advertise"
            }
          },
          {
            path: "/atmt/advertise/create",
            name: "AdvertiseCreate",
            component: AdvertiseCreate,
            meta: {
              slug: "advertise"
            }
          },
          {
            path: "/atmt/advertise/edit/:id",
            name: "AdvertiseEdit",
            component: AdvertiseEdit,
            meta: {
              slug: "advertise"
            }
          },
          {
            path: "/atmt/material",
            name: "Material",
            component: Material,
            meta: {
              nav: {
                icon: "el-icon-user-solid",
                title: "物料"
              },
              slug: "material"
            }
          },
          {
            path: "/atmt/material/create",
            name: "MaterialCreate",
            component: MaterialCreate,
            meta: {
              slug: "material"
            }
          },
          {
            path: "/atmt/material/edit/:id",
            name: "MaterialEdit",
            component: MaterialEdit,
            meta: {
              slug: "material"
            }
          }
        ]
      },
      {
        path: "/setup",
        name: "SetUp",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            icon: "el-icon-setting",
            title: "管理设置"
          },
          slug: "role"
        },
        children: [
          {
            path: "/setup/manager",
            name: "Manager",
            component: Manager,
            meta: {
              nav: {
                icon: "el-icon-user-solid",
                title: "管理员"
              },
              slug: "role"
            }
          },
          {
            path: "/setup/manager/create",
            name: "ManagerCreate",
            component: ManagerCreate,
            meta: {
              slug: "role"
            }
          },
          {
            path: "/setup/manager/edit/:id",
            name: "ManagerEdit",
            component: ManagerEdit,
            meta: {
              slug: "role"
            }
          },
          {
            path: "/setup/role",
            name: "Role",
            component: Role,
            meta: {
              nav: {
                icon: "el-icon-s-custom",
                title: "角色"
              },
              slug: "role"
            }
          },
          {
            path: "/setup/role/create",
            name: "RoleCreate",
            component: RoleCreate,
            meta: {
              slug: "role"
            }
          },
          {
            path: "/setup/role/edit/:id",
            name: "RoleEdit",
            component: RoleEdit,
            meta: {
              slug: "role"
            }
          }
        ]
      }
    ]
  },
];
