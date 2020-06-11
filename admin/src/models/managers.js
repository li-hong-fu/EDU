import request from "./request";
import api from "./api";

export default {
  index: function() {
    return request.get(api.manager);
  },
  created: function(data) {
    return request.post(api.manager, data);
  },
  indexItem: function(id) {
    return request.get(api.managerItem(id));
  },
  updated: function(id, data) {
    return request.put(api.managerItem(id), data);
  },
  delete: function(id) {
    return request.delete(api.managerItem(id));
  }
};
