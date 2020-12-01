<template>
  <div id="home">
    <div id="home_navbar">
      <navbar>
        <template v-slot:center>
          <div>首页信息</div>
        </template>
      </navbar>
    </div>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";
import getLunbo from "network/homerequest";
export default {
  name: "Home",
  components: {
    Navbar,
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