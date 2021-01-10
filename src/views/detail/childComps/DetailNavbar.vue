<template>
  <div class="detailNavbar-content">
    <div class="left" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="" />
    </div>
    <div class="right">
      <div
        v-for="(item, index) in titles"
        :key="index"
        :class="{ active: currentIndex == index }"
        @click="currentActive(index)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";
export default {
  name: "DetailNavbar",
  components: {
    Navbar,
  },
  // props:{
  //   goodsInfo:{
  //     type:Object,
  //     default(){
  //       return {}
  //     }
  //   }
  // },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
      goodId: null,
    };
  },
  methods: {
    backClick() {
      this.$router.go(-1);
    },
    currentActive(index) {
      this.currentIndex = index;
      this.$emit("navbarClick", index);
    },
  },
  created() {},
};
</script>

<style scoped>
.detailNavbar-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.left {
  margin-left: 20px;
}
.right {
  width: 80%;
  display: flex;
  justify-content: space-evenly;
  font-size: 40px;
  margin-top: 10px;
}
.left img {
  height: 50px;
  width: 50px;
}
.active {
  color: deeppink;
}
</style>