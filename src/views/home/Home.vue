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
    <Slide>
      <template v-slot:imgContent>
        <!-- 解决v-for报错，加上:key='index'即可 -->
        <li v-for="(item,index) in banners" :key="index">
          <a :href="item.link">
            <img :src="item.image" alt="图片走丢了...">
          </a>
        </li>
      </template>
      <template v-slot:circleContent>
        <li v-for="(item,index) in banners" :key="index" class="indicator-li"></li>
      </template>
    </Slide>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";
import getLunbo from "network/homerequest";
import Slide from "components/common/slide/Slide";
export default {
  name: "Home",
  components: {
    Navbar,
    Slide,
  },
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  //发送请求拿数据,随后用data保存
  // Q2:created()函数中this作用域是从里往外找的？created()中this指向当前组件对象
  created() {
    getLunbo().then((res) => {
      console.log(res);
      this.banners = res.data.banner.list; //Q3:为什么这里不用this.data.banners?
      this.recommends = res.data.recommend.list; //Q3:为什么这里不用this.data.banners?
    });
  },
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