// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"
import VueLazyLoad from "vue-lazyload"
import infiniteScroll from "vue-infinite-scroll"
import {currency} from './util/currency'

import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/product.css'

Vue.use(infiniteScroll);
Vue.use(VueLazyLoad,{
  loading:'static/loading-svg/loading-bars.svg',
  try:3
})

//阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

//全局过滤器
Vue.filter('currency',currency);


//完全禁用ESLint进行检测
/* eslint-disable no-new */
new Vue({
  el: '#app',    //也可以通过在末尾用.$mount('#app');挂载
  router,
  template: '<App/>',
  components: { App }
})

//模板渲染也可以通过render函数渲染
// render: function(h) {
//   return h(App);
// }
