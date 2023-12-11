import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Vant from 'vant';
import store from './store'
import 'vant/lib/index.css';
import VueAxios from 'vue-axios'
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'fUchqriFFPshxF44hgjyvUX36729g5oG'
});
Vue.use(Vant);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
      Vue.prototype.$bus=this
  },
}).$mount('#app')
