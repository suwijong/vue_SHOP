import Vue from 'vue'
import {
    SAVE_SHOPDATAS,
    ADD_FOOD_COUNT,
    DEL_FOOD_COUNT,
    CLEAR_CARTSHOPS,
    SAVE_CARTSHOPS
} from '../mutations-type'

import {
    getShopDatas,
} from '../../api'


const state = {
    initData:'初始测试shuju',
    shopDatas:{},//商家数据
    cartShops:[],//购物车的food
}

const mutations = {
    [SAVE_SHOPDATAS](state,shopDatas){
        state.shopDatas = shopDatas
    },

    [ADD_FOOD_COUNT](state,{food}){
        if (food.count > 0) {
            food.count++
        } else {
            Vue.set(food,'count',1)
           //当count增加时 将这个增加的push 到保存数据的数组中
            state.cartShops.push(food)
        }
        
    },

    [DEL_FOOD_COUNT](state,{food}){
        if (food.count > 0) {
            food.count--
            if (food.count === 0) {//当count为0时 移除购物车
                state.cartShops.splice(state.cartShops.indexOf(food),1)
            }
        }
    },

    [CLEAR_CARTSHOPS](state){
      state.cartShops.forEach(food => food.count = 0);  
      state.cartShops = []
    },

    [SAVE_CARTSHOPS](state,cartShops){
        
        state.cartShops = cartShops
      },

}

const actions = {
    async getShopDatasAction({commit}){
       let result = await getShopDatas()
       if (result.code === 0) {
           commit(SAVE_SHOPDATAS,result.data)
       }
    },

    async changeFoodCount({commit},{isAdd,food}){
        if (isAdd) {
            commit(ADD_FOOD_COUNT,{food})
        } else {
            commit(DEL_FOOD_COUNT,{food})
        }
     },

}

const getters = {
    //计算添加商品后  总的count 和 总的价格
  totalCount(state){
     return state.cartShops.reduce((pre,food)=>{
       return pre += food.count
     },0) 
  },
  totalPrice(state){
    return state.cartShops.reduce((pre,food)=>{
      return pre += food.count * food.price
    },0)
  }
}

export default  {
  state,
  mutations,
  actions,
  getters
}