<template>
  <!-- 此处需要封装两层DIV，因为better-scroll要求外层为有设置height样式属性的包裹层，内部第一层只能有一个子元素！如果直接在内部第一层设置slot，如果替换元素为多个节点，better-scroll直接就失效了。 -->
  <div class="wrapper" ref="homeScroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      // 默认不监听
      default: 0,
      required: false
    },
    pullUpLoad:{
      type:Boolean,
      // 默认不需要上拉加载更多
      default:false,
      required:false
    }
  },
  data() {
    return {
      // 定义一个变量用来储存better-scroll实例对象,否则在mounted中执行完就从内存中回收，然后整个better-scroll就没用了。
      scroll: null,
    };
  },
  methods: {
    // ES6新语法可以设置参数默认值。这里默认time为500毫秒
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp(){
      // 完成上拉加载，这样下一次上拉加载可以正常执行
      this.scroll.finishPullUp()
    },
    refresh(){
      console.log("refresh被执行...")
      // 主要是因为better-scroll的滚动区域大小是计算出来的特性+图片异步加载慢特性会产生BUG！正常的话图片加载快，在bscroll计算出可滚动区域高度（BScroll.scrollerHeight属性记录）之前已经完成图片加载，则不会产生BUG.如果图片加载慢，
      // 那么bscroll计算可滚动区域高度时会忽略图片的高度。这样可滚动区域就变小了，导致往下滚动时出现滚动不了的BUG.所以要手动刷新一下这个bscroll对象，让其重新计算可滚动区域高度便可以解决。
      this.scroll && this.scroll.refresh()
    },
  },
  mounted() {
    // 注意！这里建立BScroll对象不要用document.querySelector(...)这样类似的API，因为获取的不一定是本组件中你想要的那个元素。用Vue的ref属性来指定获取特定元素最好！！！
    // 而且！ref起名字不要单词中间加'-',否则会引起一些莫名其妙的错误！！！老老实实用驼峰就可以了。
    // 介绍一下ref使用方法：①ref用在组件上，使用this.$refs.ref_name获得的是一个组件对象。②ref用在普通元素上，this.$refs.ref_name获得的是一个普通元素对象。
    this.scroll = new BScroll(this.$refs.homeScroll, {
      // 设置属性参数，用来构造better-scroll实例
      // 侦测位置。此处我们不要写死，因为后面引入这个scroll组件的父级应用可能需要监听，也可能不需要监听，应该用props动态决定，提高扩展性
      probeType: this.probeType,
      // 支持上拉加载。同样，此处我们不要写死，因为后面引入这个scroll组件的父级应用可能需要上拉加载更多，也可能不需要上拉加载更多，应该用props动态决定，提高扩展性
      pullUpLoad: this.pullUpLoad,
      // 支持内部其他元素点击事件可以被外部监听到。默认为false，只有button这类元素(原生带有点击属性)可以发生点击事件被监听到。类似div、span这类元素(原生没有点击属性的)点击是不会被监听到的，
      // 为了支持他们可以被点击，所以click属性设置为true。
      click: true,
    });
    
    // 添加滚动监听事件
    this.scroll.on("scroll", (position) => {
      console.log(position);
      this.$emit("scroll", position);
    });

    // 添加上拉加载更多事件
    this.scroll.on('pullingUp',()=>{
      console.log("scroll组件已经监听到上拉加载事件！")
      this.$emit('allReadyToCurrentBottom')
    })
  },
};
</script>

<style>
</style>