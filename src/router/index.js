//生成一个路由器
import Vue from 'vue'
import VueRouter from 'vue-router'
//引入路由
import routes from './routes'

//声明使用
Vue.use(VueRouter)

let router = new VueRouter({
    routes
})

export default router