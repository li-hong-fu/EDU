import request from "./request";
import api from "./api";

export default {
  created: function(data) {
    return request.post(api.zhiyeCourse, data);
  },
  delete: function(id) {
    return request.delete(api.zhiyeCourseItem(id));
  },
  sort: function(data) {
    return request.post(api.zhiyeCourseSort, data);
  }
};
