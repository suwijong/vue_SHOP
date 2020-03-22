import Vue from 'vue'
import 'lib-flexible/flexible'
import './Veevalidate'
import {Button} from 'mint-ui'
import 'mint-ui/lib/style.css'
import './mock/mockServer'

import * as API from './api'
import App from './App.vue'
import router from './router'
import store from './store'
import GshopHeader from './components/GshopHeader/GshopHeader.vue'

//把请求的方法挂到原型上
Vue.prototype.$API = API
Vue.component('GshopHeader', GshopHeader)
Vue.component(Button.name,Button)
Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

new Vue({
  el:'#app',
  render:h=> h(App),
  router, //安装路由器//$router  
          //  $route  path 
  store        
})