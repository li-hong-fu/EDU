const PREFIX = "http://127.0.0.1:7001";

export default {
  send:`${PREFIX}/api/web/sms/send`,
  users:`${PREFIX}/api/web/sms/login`,
  wechat:`${PREFIX}/api/web/auth/social/wechat/url`,
  userItem:(id) =>`${PREFIX}/api/web/user/user-info/${id}`,
  logout:(id) => `${PREFIX}/api/web/user/user-info/logout/${id}`,
  qiniu: `${PREFIX}/qiniu`,
  
  phoneBind:(id) =>`${PREFIX}/api/web/user/phone-bind/${id}`,
  wechatBind:(id) => `${PREFIX}/api/web/user/wechat-bind/${id}`,
  
  index:`${PREFIX}/api/web/course-recommand`,
  indexItem:(id) => `${PREFIX}/api/web/course/${id}`,
  indexItemVideo:(id) => `${PREFIX}/api/web/course/section/${id}`,
  zhiye:`${PREFIX}/api/web/zhiye`,
  zhiyeItem:(id) => `${PREFIX}/api/web/zhiye/${id}`,
  zhiyeItemCourse:(id) => `${PREFIX}/api/web/zhiye/path/${id}`
}