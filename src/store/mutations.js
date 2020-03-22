//引入常量
import {
    SAVE_ADDRESS,
    SAVE_CATEGORYS,
    SAVE_SHOPLIST,
    SAVE_USER,
    SAVE_TOKEN,
    LOGOUT
} from './mutations-type'


export default{
    //保存地址
    [SAVE_ADDRESS] (state, address) {
        state.address = address
    },
    //保存商品列表
    [SAVE_CATEGORYS] (state, categorys) {
        state.categorys = categorys
      },
      //商家
    [SAVE_SHOPLIST] (state, shopList) {
        state.shopList = shopList
      } ,
    //用户
    
    [SAVE_USER] (state, user) {
        state.user = user
      } , 
    //用户的唯一标识 token
    [SAVE_TOKEN] (state, token) {
      state.token = token
    } ,  
    
    //退出登录
    [LOGOUT] (state) {
      //清除vuex中用户信息
      state.user = {}
      state.token = ''
      //清除localstorage 中的token
      localStorage.removeItem('token_key')
    } , 
}