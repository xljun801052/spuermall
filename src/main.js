import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import mitt from "mitt";
import store from "./store/index";

// vue-cli3.x+版本的插件注册安装是在这里进行的，不像之前使用Vue.use(...)。如果有多个插件，逗号分开就可以了。
// createApp(App).mount('#app')
// createApp(App).use(router).mount('#app')

const app = createApp(App);
app.use(router).use(store).mount("#app");

//创建事件总线
// Vue2.x版本写法
// Vue.prototype.$bus = new Vue()
// Vue3.x版本写法【Vue3.0版本中把$on、$off、$once等事件函数都去除掉了，只留下了$emit（）用于父子组件之间的沟通。
// 为了能够使用事务总线，除了$emit触发事件之外，还至少应该有$on监听函数。官方推荐使用第三方库mitt--->>>(npm install --save mitt)】
// app.config.globalProperties.$bus = createApp({})
app.config.globalProperties.$bus = new mitt();
