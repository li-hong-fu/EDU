import request from "./request";
import api from "./api";

export default {
  index: function() {
    return request.get(api.roles);
  },
  permission: function() {
    return request.get(api.permission);
  },
  created: function(data) {
    return request.post(api.roles, data);
  },
  indexItem: function(id) {
    return request.get(api.roleItem(id));
  },
  updated: function(id, data) {
    return request.put(api.roleItem(id), data);
  },
  delete: function(id) {
    return request.delete(api.roleItem(id));
  }
};
