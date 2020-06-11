import request from "./request";
import api from "./api";

export default {
  index: function(data) {
    return request.get(api.zhiye, data);
  },
  indexItem: function(id, data) {
    return request.get(api.zhiyeItem(id), data);
  },
  create: function(data) {
    return request.post(api.zhiye, data);
  },
  updated: function(id, data) {
    return request.put(api.zhiyeItem(id), data);
  },
  delete: function(id) {
    return request.delete(api.zhiyeItem(id));
  }
};
