import request from "./request";
import api from "./api";

export default {
  index: function() {
    return request.get(api.zhiye)
  },
  indexItem: function(id) {
    return request.get(api.zhiyeItem(id))
  },
  indexItemCourse: function(id) {
    return request.get(api.zhiyeItemCourse(id))
  }
}