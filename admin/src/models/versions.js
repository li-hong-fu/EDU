import request from "./request";
import api from "./api";

export default {
  index: function(id) {
    return request.get(api.versionItem(id));
  },
  created: function(data) {
    return request.post(api.versions, data);
  },
  updated: function(id, data) {
    return request.put(api.versionItem(id), data);
  },
  delete: function(id) {
    return request.delete(api.versionItem(id));
  },
  sort: function(data) {
    return request.post(api.versionSort, data);
  }
};
