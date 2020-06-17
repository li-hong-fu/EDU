import request from "./request";
import api from "./api";

export default {
  index: function() {
    return request.get(api.stack)
  },
  indexRandom: function(id,data) {
    return request.get(api.stackRandom(id),data)
  }
}