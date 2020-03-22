<template>
  <div id="shopContainer">
     <ShopHeader/>
     <div class="tabs">
        <div class="tabs-item">
            <router-link to="/shop/goods" replace>订餐</router-link>
        </div>
          <div class="tabs-item">
            <router-link to="/shop/rating" replace>评价</router-link>
        </div>
          <div class="tabs-item">
            <router-link to="/shop/info" replace>商家</router-link>
        </div>
     </div>
     <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import ShopHeader from '../../components/ShopHeader/ShopHeader'
import {mapState} from 'vuex'
import {SAVE_SHOPDATAS,SAVE_CARTSHOPS} from '../../store/mutations-type'
 export default {
      components:{ShopHeader},
      mounted(){
        
        //解决vuex 页面刷新数据丢失问题
        //从sessionStorage中读取数据
       
        let shopDatas = JSON.parse(sessionStorage.getItem('shopDatas'))
        if (shopDatas) {
            // 有数据 将读取的数据存入到vuex中
            this.$store.commit(SAVE_SHOPDATAS,shopDatas)

           //计算最新的购物车数据
           let cartShops = shopDatas.goods.reduce((pre,good)=>{
               pre.push(...good.foods.filter(food => food.count)) 

               return pre
           },[])  
           //将数据 cartShops保存到vuex中
           this.$store.commit(SAVE_CARTSHOPS,cartShops)
        } else {
          //没有数据  分发action 发送请求获取数据
           this.$store.dispatch('getShopDatasAction')
        }

        //unload事件 在页面确定刷新  但是没有刷新之前执行
        window.addEventListener('unload',()=>{
          //将最新的数据 存到sessionStorage中
          sessionStorage.setItem('shopDatas',JSON.stringify(this.shopDatas))
        })

      },

      computed: {
        shopDatas:state => state.shop.shopDatas
      },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  #shopContainer
    .tabs
       display flex
       bottom-border-1px(#eee)
       .tabs-item
          
         flex 1
         height 40px
         line-height 40px
         text-align center
         font-size 16px
         a
           display block
           position relative
           &.router-link-active
             color $green
             &:after
               content ''
               width 40px
               height 2px
               background-color $green
               position absolute
               bottom 0
               left 50%
               transform translateX(-50%)
</style>

