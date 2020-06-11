import request from "./request";
import api from "./api";

export default {
  send: function(data){
    return request.post(api.send,data)
  },
  smsLogin: function(data){
    return request.post(api.users,data)
  },
  userInfo: function(id){
    return request.get(api.userItem(id))
  },
  userUpdated: function(id,data) {
    return request.put(api.userItem(id),data)
  },
  logout: function(id) {
    return request.put(api.logout(id))
  },
  phoneBind: function(id,data){
    return request.put(api.phoneBind(id),data)
  },
  relievePhone: function(id){
    return request.delete(api.phoneBind(id))
  }
}