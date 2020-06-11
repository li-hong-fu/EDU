import request from "./request";
import api from "./api";

export default {
  index: function(data) {
    return request.get(api.course, data);
  },
  createCourse: function(data) {
    return request.post(api.course, data);
  },
  courseShow: function(id, data) {
    return request.get(api.courseId(id), data);
  },
  courseEdit: function(id, data) {
    return request.put(api.courseId(id), data);
  },
  courseDetele: function(id) {
    return request.delete(api.courseId(id));
  }
};
