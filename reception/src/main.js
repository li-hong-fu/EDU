import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VideoPlayer)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
