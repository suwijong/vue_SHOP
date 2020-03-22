import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//引入模块modules
import shop from './modules/shop'


Vue.use(Vuex)

const store = new Vuex.Store({
   modules:{
      shop:shop
   },
   state,
   mutations,
   actions,
   getters
})

export default store