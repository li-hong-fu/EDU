import request from "./request";
import api from "./api";

export default {
  index: function(id, data) {
    return request.get(api.zhiyePathItem(id), data);
  },
  create: function(data) {
    return request.post(api.zhiyePath, data);
  },
  updated: function(id, data) {
    return request.put(api.zhiyePathItem(id), data);
  },
  delete: function(id) {
    return request.delete(api.zhiyePathItem(id));
  }
};
