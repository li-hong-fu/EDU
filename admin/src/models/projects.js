import request from "./request";
import api from "./api";

export default {
  index: function(data) {
    return request.get(api.projects, data);
  },
  indexItem: function(id) {
    return request.get(api.projectItem(id));
  },
  created: function(data) {
    return request.post(api.projects, data);
  },
  updated: function(id, data) {
    return request.put(api.projectItem(id), data);
  },
  delete: function(id) {
    return request.delete(api.projectItem(id));
  }
};
