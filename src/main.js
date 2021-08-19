import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import productApplication from './service/products.js'
Vue.prototype.GLOBAL = productApplication
Vue.config.productionTip = false

Vue.use(Antd);
new Vue({
  render: h => h(App),
}).$mount('#app')
