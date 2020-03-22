<template>
  <div id="footerContainer">
       <div :class="{active:$route.path === '/msite'}" @click="goPath('/msite')" class="guideItem">
           <i class="iconfont icon-home1"></i>
           <span>首页</span>
       </div>
        <div :class="{active:$route.path === '/search'}" @click="goPath('/search')" class="guideItem">
           <i class="iconfont icon-search1"></i>
           <span>搜索</span>
       </div>
       <div :class="{active:$route.path === '/order'}" @click="goPath('/order')" class="guideItem">
           <i class="iconfont icon-icon-test"></i>
           <span>订单</span>
       </div>
       <div :class="{active:$route.path === '/profile'}" @click="goPath('/profile')" class="guideItem">
           <i class="iconfont icon-icon-test1"></i>
           <span>我的</span>
       </div>
      
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
      methods:{
          goPath (path){
              if (path !== this.$route.path) {
                 this.$router.push(path) 
              }
             
          }
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
#footerContainer
   display flex
   width 100%
   height 50px
   background-color #ffffff
   position fixed
   left 0
   bottom 0
   .guideItem
       width 25%
       height 50px 
       text-align center
       flex-direction column
       display flex
    .iconfont
        font-size 22px
        line-height 30px 
    .active
        color $green      
 
</style>
