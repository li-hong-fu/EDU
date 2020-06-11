import request from "./request";
import api from "./api";

export default {
  getSection: function(id, data) {
    return request.get(api.courseSectionEdit(id), data);
  },
  createSection: function(data) {
    return request.post(api.courseSection, data);
  },
  updateSection: function(id, data) {
    return request.put(api.courseSectionEdit(id), data);
  },
  deleteSection: function(id) {
    return request.delete(api.courseSectionEdit(id));
  }
};
