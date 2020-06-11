const PREFIX = "http://127.0.0.1:7001";

export default {
  passwordLogin: `${PREFIX}/managers`,
  qiniu: `${PREFIX}/qiniu`,

  //技能
  stack: `${PREFIX}/api/admin/stack`,
  stackEdit: id => `${PREFIX}/api/admin/stack/${id}`,

  //题库
  question: `${PREFIX}/api/admin/skill/question`,
  questionEdit: id => `${PREFIX}/api/admin/skill/question/${id}`,

  //课程
  course: `${PREFIX}/api/admin/course`,
  courseId: id => `${PREFIX}/api/admin/course/${id}`,
  courseChapter: `${PREFIX}/api/admin/chapter`,
  courseChapterEdit: id => `${PREFIX}/api/admin/chapter/${id}`,
  courseChapterSort: `${PREFIX}/api/admin/chapter/sort/edit`,
  courseSection: `${PREFIX}/api/admin/section`,
  courseSectionEdit: id => `${PREFIX}/api/admin/section/${id}`,

  //职业
  zhiye: `${PREFIX}/api/admin/zhiye`,
  zhiyeItem: id => `${PREFIX}/api/admin/zhiye/${id}`,
  zhiyePath: `${PREFIX}/api/admin/zhiye/path`,
  zhiyePathItem: id => `${PREFIX}/api/admin/zhiye/path/${id}`,
  zhiyeCourse: `${PREFIX}/api/admin/zhiye/course`,
  zhiyeCourseItem: id => `${PREFIX}/api/admin/zhiye/course/${id}`,
  zhiyeCourseSort: `${PREFIX}/api/admin/zhiye/course/sort/edit`,

  //公司
  companies: `${PREFIX}/api/admin/company`,
  companiesItem: id => `${PREFIX}/api/admin/company/${id}`,

  //项目
  projects: `${PREFIX}/api/admin/project`,
  projectItem: id => `${PREFIX}/api/admin/project/${id}`,
  versions: `${PREFIX}/api/admin/version`,
  versionItem: id => `${PREFIX}/api/admin/version/${id}`,
  versionSort: `${PREFIX}/api/admin/project/version/sort`,
  stories: `${PREFIX}/api/admin/story`,
  storiesItem: id => `${PREFIX}/api/admin/story/${id}`,
  tasks: `${PREFIX}/api/admin/task`,
  tasksItem: id => `${PREFIX}/api/admin/task/${id}`,
  tasksSort: `${PREFIX}/api/admin/project/task/sort`,

  //用户的角色与权限
  roles: `${PREFIX}/api/admin/role`,
  roleItem: id => `${PREFIX}/api/admin/role/${id}`,
  permission: `${PREFIX}/api/admin/permission`,
  manager: `${PREFIX}/api/admin/manager`,
  managerItem: id => `${PREFIX}/api/admin/manager/${id}`,

  //广告物料
  advertise: `${PREFIX}/api/advertise`,
  advertiseItem: id => `${PREFIX}/api/advertise/${id}`,
  material: `${PREFIX}/api/material`,
  materialItem:(id)=> `${PREFIX}/api/material/${id}`,
  advertiseMaterial:`${PREFIX}/api/advertise/material`,
  advertiseMaterialItem:(id)=> `${PREFIX}/api/advertise/material/${id}`,
  advertiseMaterialItemSort:`${PREFIX}/api/advertise/material/sort/edit`
};
