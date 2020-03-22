//引入路由  统一管理路由
import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'


import Goods from '../pages/Shop/Goods/Goods.vue'
import Rating from '../pages/Shop/Rating/Rating.vue'
import Info from '../pages/Shop/Info/Info.vue'


export default [
    {
        path:'/msite',
        component:Msite,
        meta:{
            isShowFooter:true
        }
    },

    {
        path:'/search',
        component:Search,
        meta:{
            isShowFooter:true
        }
    },

    {
        path:'/order',
        component:Order,
        meta:{
            isShowFooter:true
        }
    },

    {
        path:'/profile',
        component:Profile,
        meta:{
            isShowFooter:true
        }
    },
    {
        path:'/login',
        component:Login,
    

    },

    {
        path:'/shop',
        component:Shop,
        children:[
            {
                path:'/shop/goods',
                component:Goods
            },
            {
                path:'/shop/rating',
                component:Rating
            },
            {
                path:'/shop/info',
                component:Info
            },

            //重定向
            {
                path:'/shop',
                redirect:'/shop/goods'
            },
            
        ]

    },

    //重定向
    {
        path:'/',
        redirect:'/login'
    }
]