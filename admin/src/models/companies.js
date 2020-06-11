import request from "./request";
import api from "./api";

export default {
  index: function(data) {
    return request.get(api.companies, data);
  },
  indexItem: function(id) {
    return request.get(api.companiesItem(id));
  },
  create: function(data) {
    return request.post(api.companies, data);
  },
  updated: function(id, data) {
    return request.put(api.companiesItem(id), data);
  },
  delete: function(id) {
    return request.delete(api.companiesItem(id));
  }
};
