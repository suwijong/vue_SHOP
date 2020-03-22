<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.isShowFooter"/>
  </div>
</template> 

<script type="text/ecmascript-6">
import {SAVE_USER} from './store/mutations-type'
import FooterGuide from './components/FooterGuide/FooterGuide'
  export default {
    name:'app',
    //注册组件
    components:{
      FooterGuide
    },

    async mounted(){
      let result = await this.$API.autoLogin()

      //存入vuex中
      this.$store.commit(SAVE_USER,result.data)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

 
</style>