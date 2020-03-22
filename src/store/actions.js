
import {
    getAddress,
    getCategorys,
    getShopList
  } from '../api'
  
  import {
    SAVE_ADDRESS,
    SAVE_CATEGORYS,
    SAVE_SHOPLIST,
    SAVE_USER,
    SAVE_TOKEN
  } from './mutations-type'
  
  
  export default {
    async getAddressAction({commit}){
      let result = await getAddress(40.10038,116.36867)
      // if(result.code === 0){
      //   commit(SAVE_ADDRESS, result.data)
      // }
      
      !!(result.code === 0) && commit(SAVE_ADDRESS, result.data)
    
    },

    async getCategorysAction({commit}){
        let result = await getCategorys()
        !!(result.code === 0) && commit(SAVE_CATEGORYS, result.data)
      },
    
    async getShopListAction({commit}){
        let result = await getShopList(40.10038,116.36867)
        !!(result.code === 0) && commit(SAVE_SHOPLIST, result.data)
      },


    async getUserInfoAction({commit},user){
      //将token保存到vuex 中 
      commit(SAVE_TOKEN,user.token)
      //在删除之前 token 不仅要保存vuex 还要保存到 localStore中
      localStorage.setItem('token_key',user.token)
      //保存之后 本来user 里面的token就不需要了
      //有对象的delete语法删除就好了
      delete user.token     
 
        commit(SAVE_USER,user)
      }


  }
  