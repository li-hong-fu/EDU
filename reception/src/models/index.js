import request from "./request";
import api from "./api";

export default {
  indexCourse: function(){
    return request.get(api.index)
  },
  indexItem: function(id){
    return request.get(api.indexItem(id))
  },
  indexItemVideo: function(id){
    return request.get(api.indexItemVideo(id))
  }
}