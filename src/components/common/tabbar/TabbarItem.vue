<template>
  <div class="tabbar-item" @click="changeLink()">
    <!-- 使用div包裹，将插槽的属性放在div标签里面以免被替换的时候将插槽实现的标签属性丢失，达不到对应效果 -->
    <!-- Item的图片 -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <!-- Item的激活时图片 -->
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- Item的文字 -->
    <div :style="{color:activeColor}"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "tabbarItem",
  // 路径由外部动态传过来，使用path接收。可以固定成String类型
  props: {
    path: String,
    activeColor: {
      type: String,
      //默认粉色
      default: "grey",
    },
  },
  //组件的data必须是函数
  data() {
    return {
      // 不能写死，怎么办？抽到计算属性里面去
      //   isActive: false,
    };
  },
  computed: {
    isActive() {
      //   根据当前活跃路由的path属性是否是此组件实例来决定是否显示激活状态
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeColor() {
      return this.isActive ? this.activeColor : {};
    },
  },
  methods: {
    // 点击进行路由跳转
    changeLink() {
      // console.log("即将跳转到：" + this.path);//这个地方打印了/home，可以证明this指向的是当前的组件实例。而this.$route以及this.$router都是undefined，
      //推理出：vue原型中的全局属性并没有路由属性，所以肯定是vue-router插件使用问题导致没有挂载到Vue原型上面去！
      this.$router.push(this.path);
    },
  },
};
</script>

<style>
.tabbar-item {
  flex: 1;
  text-align: center;
  /* 移动端tabbar一般都是49px,以后做PC端可以适当修改 */
  height: 49px;
  /* 盒子间过渡阴影效果 */
  box-shadow: 0, -1px, 3px, rgba(100, 100, 100, 1);
  margin-top: 6px;
}

.tabbar-item img {
  width: 20px;
  height: 20px;
}
/* 因为需要自由灵活的颜色调整，所以写死的不用了。替代方案：v-bind绑定style,抽取成一个计算属性来动态决定 */
/* .active {
    color: brown;
} */
</style>
