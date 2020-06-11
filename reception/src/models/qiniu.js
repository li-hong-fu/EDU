import request from "./request";
import api from "./api";

export default {
  qiniu: function(data) {
    return request.get(api.qiniu, data);
  }
};
