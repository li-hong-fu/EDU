import request from "./request";
import api from "./api";

export default {
  showQuestion: function(data) {
    return request.get(api.question, data);
  },
  AddQuestion: function(data) {
    return request.post(api.question, data);
  },
  getQuestion: function(id, data) {
    return request.get(api.questionEdit(id), data);
  },
  editQuestion: function(id, data) {
    return request.put(api.questionEdit(id), data);
  },
  deleteQuestion: function(id) {
    return request.delete(api.questionEdit(id));
  }
};
