import request from "./request";
import api from "./api";

export default {
  createChapter: function(data) {
    return request.post(api.courseChapter, data);
  },
  updateChapter: function(id, data) {
    return request.put(api.courseChapterEdit(id), data);
  },
  deleteChapter: function(id) {
    return request.delete(api.courseChapterEdit(id));
  },
  sortChapter: function(data) {
    return request.put(api.courseChapterSort, data);
  }
};
