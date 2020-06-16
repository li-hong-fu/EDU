import request from "./request";
import api from "./api";

export default {
  index: function() {
    return request.get(api.stack)
  }
}