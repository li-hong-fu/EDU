import request from "./request";
import api from "./api";

export default {
  index: function(){
    return request.get(api.material)
  },
  created: function(data) {
    return request.post(api.material,data)
  },
  indexItem: function(id) {
    return request.get(api.materialItem(id))
  },
  updated: function(id,data) {
    return request.put(api.materialItem(id),data)
  },
  delete: function(id){
    return request.delete(api.materialItem(id))
  }
}