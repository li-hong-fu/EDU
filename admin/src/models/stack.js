import request from "./request";
import api from "./api";

export default {
  showStack: function(data) {
    return request.get(api.stack, data);
  },
  AddStack: function(data) {
    return request.post(api.stack, data);
  },
  getStack: function(id, data) {
    return request.get(api.stackEdit(id), data);
  },
  editStack: function(id, data) {
    return request.put(api.stackEdit(id), data);
  },
  deleteStack: function(id) {
    return request.delete(api.stackEdit(id));
  }
};
