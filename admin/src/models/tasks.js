import request from "./request";
import api from "./api";

export default {
  created: function(data) {
    return request.post(api.tasks, data);
  },
  updated: function(id, data) {
    console.log(id, data);
    return request.put(api.tasksItem(id), data);
  },
  delete: function(id) {
    return request.delete(api.tasksItem(id));
  },
  sort: function(data) {
    return request.post(api.tasksSort, data);
  }
};
