<template>
  <tabbar>
    <!-- 我试过不加这个v-slot:default，结果又是出错显示不出来。 -->
    <template v-slot:default>
      <tabbar-item path="/home" activeColor="deepPink">
        <!-- dom中使用路径别名需要在路劲最前面加上一个'~'符号 -->
        <template v-slot:item-icon>
          <img src="~assets/img/icon/home/首页.svg" />
        </template>
        <template v-slot:item-icon-active>
          <img src="~assets/img/icon/home/首页_active.svg" />
        </template>
        <template v-slot:item-text>
          <div>首页</div>
        </template>
      </tabbar-item>
      <tabbar-item path="/appstore" activeColor="deepPink">
        <!-- dom中使用路径别名需要在路劲最前面加上一个'~'符号 -->
        <template v-slot:item-icon>
          <img src="~assets/img/icon/appstore/商城.svg" />
        </template>
        <template v-slot:item-icon-active>
          <img src="~assets/img/icon/appstore/商城_active.svg" />
        </template>
        <template v-slot:item-text>
          <div>商城</div>
        </template>
      </tabbar-item>
      <tabbar-item path="/cart" activeColor="deepPink">
        <!-- dom中使用路径别名需要在路劲最前面加上一个'~'符号 -->
        <template v-slot:item-icon>
          <img src="~assets/img/icon/cart/购物车.svg" />
        </template>
        <template v-slot:item-icon-active>
          <img src="~assets/img/icon/cart/购物车_active.svg" />
        </template>
        <template v-slot:item-text>
          <div>购物车</div>
        </template>
      </tabbar-item>
      <tabbar-item path="/profile" activeColor="deepPink">
        <!-- dom中使用路径别名需要在路劲最前面加上一个'~'符号 -->
        <template v-slot:item-icon>
          <img src="~assets/img/icon/profile/我的.svg" />
        </template>
        <template v-slot:item-icon-active>
          <img src="~assets/img/icon/profile/我的_active.svg" />
        </template>
        <template v-slot:item-text>
          <div>我的</div>
        </template>
      </tabbar-item>
    </template>
  </tabbar>
  <!-- 引入"小电视机" -->
  <!-- keep-alive在路由切换时不要让组件销毁 -->
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import tabbar from "components/common/tabbar/Tabbar";
import tabbarItem from "components/common/tabbar/TabbarItem";
// import router from "./router/index";
export default {
  name: "App",
  components: {
    tabbar,
    tabbarItem,
  },
  // router,
};
</script>

<style>
/* style中引入文件使用@ */
@import "assets/css/base.css";
</style>
