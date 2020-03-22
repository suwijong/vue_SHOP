<template>
  <div id="goodContainer">
      <div class="leftContainer">
         <ul class="navList" ref="leftUl">
           <li @click="changeNavIndex(index)" :class="{active:navIndex === index}" v-for="(good, index) in goods" :key="index">
             {{good.name}}
           </li>
           
         </ul>
      </div>
      <div class="rightContainer">
        <div class="foods-wrapper">
          <ul ref="rightUl">
            <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
              <h1 class="title">{{good.name}}</h1>
              <ul>
                <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index">
                  <div class="icon">
                    <img width="57" height="57"
                        :src="food.image">
                  </div>
                  <div class="content">
                    <h2 class="name">{{food.name}}</h2>
                    <p class="desc">{{food.description}}</p>
                    <div class="extra">
                      <span class="count">月售{{food.sellCount}}份</span>
                      <span>好评率{{food.rating}}%</span></div>
                    <div class="price">
                      <span class="now">￥{{food.price}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                      <CartControl :food = "food"/>
                    </div>
                  </div>
                </li>
               
              </ul>
            </li>
          
          </ul>
        </div>
      </div>
      <ShopCart/>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
//从vuex 中映射拿到数据
import {mapState} from 'vuex'
import CartControl from '../../../components/CartControl/CartControl'
import ShopCart from '../../../components/ShopCart/ShopCart'
export default {
  components:{CartControl,ShopCart},
  data() {
    return {
      tops:[],//每个li 也就是当前点距离滑动顶部的高度
      scrollY:0,//页面滚动的距离
    }
  },
   async mounted(){
      // new BScroll('.leftContainer')
      // new BScroll('.rightContainer')
      //测试mock
      // let result =await this.$API.test2()
      // console.log(result);
      //请求回来的goods的数据
      // let result = await this.$API.getShopDatas()
      // console.log(result);  
      if (this.goods) { //子组件之间切换时在计算一下
        this._initScroll()
        this._initTop()
      }    
    },
    computed:{
       ...mapState({
         goods:state=>state.shop.shopDatas.goods
       }),
       navIndex(){
         let {tops,scrollY} = this
         //找下标
         let index = tops.findIndex((top,index)=>scrollY >= tops[index] && scrollY < tops[index + 1] )
         if (this.leftScroll && index != this.index) {
           this.index = index
           this.leftScroll.scrollToElement(this.$refs.leftUl.children[index],1000)
         }
         return index
       }
    },
    methods:{
      //自定义一个函数把两个滚动放到一起
      _initScroll(){
        if (this.leftScroll || this.rightScroll) {//如果之前生成过实例  则刷新就可以了
            this.leftScroll.refresh()  //refresh  是better-scroll自带的刷新属性
            this.rightScroll.refresh()
        } else {//如果没有生成过实例 则再new    不然在watch里new过一次  这里就重复了  会造成两次点击事件
              this.leftScroll =  new BScroll('.leftContainer',{
              scrollY:true, //纵向滑动  默认的可以不写
              click:true,//允许点击  better-scroll派发了一个点击事件
            })
              this.rightScroll = new BScroll('.rightContainer',{
              scrollY:true,
              //  probeType:1,//滚动非实时
              probeType:2,//滚动实时 惯性滑动不计算
              //  probeType:3,//滚动实时 惯性滑动计算
              click:true,
            })

            //绑定scroll事件
            this.rightScroll.on('scroll',({x,y})=>{
                this.scrollY = Math.abs(y)
            })

            this.leftScroll.on('scroll',({x,y})=>{
              this.scrollY = Math.abs(y)
            })
        }
   
      },
      //每个li 刚开始距离顶部的高度
      _initTop(){
        //让伪数组变为真数组  
        let lis = Array.from(this.$refs.rightUl.children)
        let tops = []
        let top = 0
        tops.push(top)
        for (var i = 0; i < lis.length; i++) {
          top += lis[i].clientHeight;
          tops.push(top)
        }
        this.tops = tops
      },
      changeNavIndex(index){
        console.log('点击l');
        this.scrollY = this.tops[index]
        //右侧点击左侧滑动到相应位置
        this.rightScroll.scrollTo(0,-this.scrollY,1000)
      },
    },
    // 监视 滚动是在数据加载完成后才能执行的
    watch: {
      goods(){
        // console.log(this.goods);
        // this.$nextTick组件下一次渲染完毕
          this.$nextTick(() => {
          this._initScroll()
          this._initTop()
        })
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/mixins.styl"
#goodContainer
  display flex
  overflow hidden
  height calc(100vh - 272px)
  .leftContainer
     width 80px
     background-color #f3f5f7
     /* 在cs中动态计算高度宽度 */
     
     .navList
       li
         width 100%
         height 50px
         line-height 50px
         text-align center
         position relative
         font-size 14px
         &.active
           background-color #ffffff
           color $green
         &:after
           content ''
           width 80%
           height 2px
           background-color #dddddd
           position absolute
           bottom 0
           left 10%

  .rightContainer
     width 295px
         
     .foods-wrapper
        flex: 1
        .title
          padding-left: 14px
          height: 26px
          line-height: 26px
          border-left: 2px solid #d9dde1
          font-size: 12px
          color: rgb(147, 153, 159)
          background: #f3f5f7
        .food-item
          display: flex
          margin: 18px
          padding-bottom: 18px
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
            margin-bottom: 0
          .icon
            flex: 0 0 57px
            margin-right: 10px
          .content
            flex: 1
            .name
              margin: 2px 0 8px 0
              height: 14px
              line-height: 14px
              font-size: 14px
              color: rgb(7, 17, 27)
            .desc, .extra
              line-height: 10px
              font-size: 10px
              color: rgb(147, 153, 159)
            .desc
              line-height: 12px
              margin-bottom: 8px
            .extra
              .count
                margin-right: 12px
            .price
              font-weight: 700
              line-height: 24px
              .now
                margin-right: 8px
                font-size: 14px
                color: rgb(240, 20, 20)
              .old
                text-decoration: line-through
                font-size: 10px
                color: rgb(147, 153, 159)
            .cartcontrol-wrapper
              position: absolute
              right: 0
              bottom: 12px

</style>
