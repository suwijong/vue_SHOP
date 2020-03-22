<template>
  <div id="app">
     <h2>Vue_project</h2>
     <button class="btn01">test01</button>
     <button class="btn02">test02</button>
     <p>然而世事千帆而过 路的尽头终归是温柔和月光</p>
     <button class="btn03">混合的</button>
     <ul>
       <li @click = "handleClick(item)" :class="{active:navIndex === item}" v-for="item in 10" :key="item">{{item}}</li>
     </ul>
  </div>
</template>

<script>


export default {
  name: 'app',
  data() {
    return {
      navIndex:1
    }
  },

  methods:{
    handleClick (item){
      this.navIndex = item
    }
  }

}
</script>

<style lang="stylus">
/* 定义变量 */
  $color = green  
/* 定义混合 */
  btnStyle(w,h,bgc)
    width w
    height h
    background-color bgc
  /* 定义函数 */  
  add(a,b)
    a + b
    
  #app
      h2
        color blue
        font-size 30px
      .btn01 
        width 50px
        height 40px
        background-color orange
      .btn02
        width 100px
        height 80px  
        background-color skyblue
      p 
        color $color
        font-size 22px  
      .btn03
         btnStyle(100px,50px,red)
         border-bottom add(10px,10px)  solid $color   
      ul
        li
          line-height 40px
          background-color #dddddd
          border-bottom 1px solid red  
        .active
          background-color skyblue   
</style>
