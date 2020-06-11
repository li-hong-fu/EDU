import request from "./request";
import api from "./api";

export default {
  index: function(id) {
    return request.get(api.storiesItem(id));
  },
  created: function(data) {
    return request.post(api.stories, data);
  },
  updated: function(id, data) {
    return request.put(api.storiesItem(id), data);
  },
  delete: function(id) {
    return request.delete(api.storiesItem(id));
  }
};
