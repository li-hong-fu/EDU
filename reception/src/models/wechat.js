import request from "./request";
import api from "./api";

export default {
  wechat: function(data){
    return request.post(api.wechat,data)
  },
  wechatBind: function(id,data){
    return request.put(api.wechatBind(id),data)
  },
  relieveWechat: function(id){
    return request.delete(api.wechatBind(id))
  }
}