const PREFIX = "http://127.0.0.1:7001";

export default {
  send:`${PREFIX}/api/sms/send`,
  users:`${PREFIX}/api/sms/login`,
  userItem:(id) =>`${PREFIX}/api/user/user-info/${id}`,
  logout:(id) => `${PREFIX}/api/user/user-info/logout/${id}`,
  qiniu: `${PREFIX}/qiniu`,
  wechat:`${PREFIX}/api/auth/social/wechat/url`,
  phoneBind:(id) =>`${PREFIX}/api/user/phone-bind/${id}`,
  wechatBind:(id) => `${PREFIX}/api/user/wechat-bind/${id}`
}