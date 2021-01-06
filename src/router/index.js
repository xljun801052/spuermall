// ##Vue-cli2.x+支持！
// import Vue from 'vue'
// import VueRouter from 'vue-router'
// ##Vue-cli3.x+支持！
import { createRouter, createWebHistory } from "vue-router";
// createWebHashHistory hash 路由
// createWebHistory history 路由
// createMemoryHistory 带缓存 history 路由

// 安装插件，这里是老版本的用法。4.X+不适用，在main.js中使用createApp(App).use(router)...
// 参考：https://www.cnblogs.com/nobleRhee/p/13701046.html, https://blog.csdn.net/weixin_38047955/article/details/109218994
// Vue.use(Vuerouter)

// 路由懒加载方式引入
const Home = () => import("../views/home/Home");
const Appstore = () => import("../views/appstore/Appstore");
const Cart = () => import("../views/cart/Cart");
const Profile = () => import("../views/profile/Profile");
const Detail = () => import("../views/detail/Detail");

// 创建router对象并编写路由映射关系
const routes = [
  {
    // 这里我之前没动，这样点击一指报错说路由跳转到'/#'会出错，于是我加了一个默认的路由hash模式跳转'/#'的路由规则。然后解决了！随后我删除掉这个规则恢复成 path:'' 又不报错了,但是重启之后又会出现，只好加上'/#'！！什么原因？？
    path: "/#",
    redirect: Home
  },
  {
    name: "home",
    path: "/home",
    component: Home,
    meta: {
      keepAlive: true
    }
  },
  {
    name: "appstore",
    path: "/appstore",
    component: Appstore,
    meta: {
      keepAlive: true
    }
  },
  {
    name: "cart",
    path: "/cart",
    component: Cart,
    meta: {
      keepAlive: true
    }
  },
  {
    name: "profile",
    path: "/profile",
    component: Profile,
    meta: {
      keepAlive: true
    }
  },
  {
    name: "detail",
    path: "/detail/:goodsId",
    component: Detail
  }
];

// 使用router后就需要那个"小电视"了
const router = new createRouter({
  // 3.x版本调整mode的方式
  history: createWebHistory(),
  routes
});

// 导出路由
export default router;
