import Vue from 'vue'
import App from './App.vue'

//引入UI组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入更改后的主题
import '../theme/index.css'

//引入路由
import VueRouter from 'vue-router'
import router from './router'

//使用UI组件库
Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.config.productionTip = false

Vue.prototype.$globalVar = {
  admin: 1  // 初始化为 null 或者 0/1
}
new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  beforeCreate(){
    Vue.prototype.$bus=this
  }
});
