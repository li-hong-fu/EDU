import request from "./request";
import api from "./api";

export default {
  index: function() {
    return request.get(api.advertise);
  },
  created: function(data) {
    return request.post(api.advertise, data);
  },
  indexItem: function(id) {
    return request.get(api.advertiseItem(id));
  },
  updated: function(id, data) {
    return request.put(api.advertiseItem(id), data);
  },
  delete: function(id){
    return request.delete(api.advertiseItem(id))
  },
  advertiseMaterial: function(data){
    return request.post(api.advertiseMaterial,data)
  },
  showAdvertiseMaterial: function(id){
    return request.get(api.advertiseMaterialItem(id))
  },
  deleteAdvertiseMaterial: function(id){
    return request.delete(api.advertiseMaterialItem(id))
  },
  sort: function(data){
    return request.post(api.advertiseMaterialItemSort,data)
  }
};
