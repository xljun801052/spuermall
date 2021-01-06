<template>
  <div class="good-item" @click="changeToDetail">
    <img :src="goodItem.imgSrc" alt="" @load="calcScrollHeight" />
    <div class="good-info">
      <p>{{ goodItem.imgTitle }}</p>
      <span class="price">{{ goodItem.discountPrice }}</span>
      <span class="collect">{{ goodItem.favorite }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    calcScrollHeight() {
      // 这个地方我们没办法拿到BScroll对象去调用它的refresh()方法。如果我们用发射自定义事件去处理，考虑到父组件为GoodList.vue,还要继续迭代一层发射自定义事件，太麻烦而且也不容易扩展！如何优化？
      // 方案一：使用【Vuex】，利用this.$store...改变（举个例子）X属性，同时在可以获取BScroll对象的目标组件Home.vue中监听这个属性变化从而操控refresh()调用可以！
      // 方案二：使用【事件总线】它是一个全局事件概念。可以跨组件父子关系进行监听。再当前组件中使用this.$bus.$emit('自定义事件名称',参数)来发射一个事件到事件总线中去，
      //         同时在可以获取BScroll对象的目标组件Home.vue中也使用this.$bus.$on('自定义事件名称',回调函数)来从事件总线中监听由其他组件发射的对应自定义事件从而操控refresh()调用！
      //         但是一开始的时候，这个$bus是undefined，必须赋值！我们在main.js中用Vue.prototype原型赋值：Vue.prototype.$bus = new Vue()
      //  【 ps:
      //        ①$emit()中的参数没有的话可以不写的！
      //        ②为啥总线叫bus?这单词就有一个翻译叫"总线",当然，我觉得可以起名其他的好听还直白，哈哈~~
      //   】
      //attention!!!这里的事务总线$bus的函数emit和on是来源于mitt,而不是vue,不需要使用$符号
      this.$bus.emit("imgLoaded");
    },
    // 点击商品进入商品详情页,需要返回就用push，否则可以用replace
    changeToDetail() {
      // 1、使用动态路由方式传参
      this.$router.push("/detail/" + this.goodItem.goodsId);
      // 2、使用query方式传参
      //   this.$router.push({
      //     path: "/detail",
      //     query: {
      //       goodId: this.goodItem.goodId,
      //     },
      //   });
    },
  },
};
</script>

<style>
.good-item {
  padding-bottom: 50px;
  position: relative;
  /* 结合父元素的flex布局实现一行放两个，这里不要写死width，否则不适配多种设备 */
  width: 48%;
}

.good-item img {
  width: 100%;
  height: 100%;
  background-size: cover;
  border-radius: 5px;
}

.good-info {
  font-size: 15px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.good-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 3px;
}

.good-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.good-info .collect {
  position: relative;
}

.good-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  /* 这个地方语法暂时出错，后面研究一下这些变量和别名如何使用 */
  /* background:url("~assets/img/common/collect.svg") 0 0/14px 14px; */
}
</style>