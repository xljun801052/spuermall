<template>
  <div id="home">
    <!-- navbar部分 -->
    <div id="home_navbar">
      <navbar>
        <template v-slot:center>
          <div>首页信息</div>
        </template>
      </navbar>
    </div>

    <!-- slide部分 -->
    <Slide ref="slide">
      <template v-slot:imgContent>
        <!-- 解决v-for报错，加上:key='index'即可 -->
        <li v-for="(item, index) in banners" :key="index">
          <a :href="item.link">
            <img :src="item.image" alt="图片走丢了..." />
          </a>
        </li>
      </template>
      <template v-slot:circleContent>
        <li
          v-for="(item, index) in banners"
          :key="index"
          class="indicator-li"
        ></li>
      </template>
    </Slide>

    <!-- recommends好物推荐部分 -->
    <Recommends :recommends=recommends></Recommends>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";
import getLunbo from "network/homerequest";
import Slide from "components/common/slide/Slide";
import Recommends from "./homezj/Recommends";
export default {
  name: "Home",
  components: {
    Navbar,
    Slide,
    Recommends,
  },
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  methods: {},
  //发送请求拿数据,随后用data保存
  // Q2:created()函数中this作用域是从里往外找的？created()中this指向当前组件对象
  created() {
    getLunbo().then((res) => {
      // 在请求执行成功后执行回调函数中的内容，回调函数处于其它函数的内部this不会与任何对象绑定，为undefined
      console.log(res);
      this.banners = res.data.banner.list; //Q3:为什么这里不用this.data.banners?
      this.recommends = res.data.recommend.list; //Q3:为什么这里不用this.data.banners?
      // 请关注一下这个this.$nextTick(()=>{})!!!:将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。
      // https://www.cnblogs.com/jin-zhe/p/9985436.html
      this.$nextTick(() => {
        this.$refs.slide.beginRender();
      });
    });
  },
  mounted() {},
};
Navbar;
</script>
 
<style>
/* 针对首页的navbar特定设置，抽取于navbar组件之外 */
#home_navbar {
  font-size: 25px;
  background-color: #fb7299;
  color: white;
}

.slide-view {
  display: flex;
  text-align: center;
}
</style>