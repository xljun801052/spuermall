import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

// 在原型上将vue实例作为事件总线
Vue.prototype.$bus = new Vue()

// vue-cli3.x+版本的插件注册安装是在这里进行的，不像之前使用Vue.use(...)。r如果有多个，逗号分开就可以了。
// createApp(App).mount('#app')
createApp(App).use(router).mount('#app')
