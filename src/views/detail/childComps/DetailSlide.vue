<template>
  <div id="detail-slide">
    <Slide>
      <template v-slot:imgContent>
        <li v-for="(item, index) in topImageUrls" :key="index">
          <img :src="item" alt=""/>
        </li>
      </template>
      <template v-slot:circleContent>
        <li v-for="(item, index) in topImageUrls" :key="index"></li>
      </template>
    </Slide>
  </div>
</template>

<script>
import Slide from "components/common/slide/Slide";

export default {
  name: "DetailSlide",
  props: {
    topImageUrls: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Slide,
  },
  created() {},
};
</script>

<style scoped>
#img-view li {
  float: left;
  list-style: none;
}

/* 这里图片宽度有点问题 所以写死让其自适应 */
#img-view li img {
    width: 750px;
}

#indicator-view li {
  width: 16px;
  height: 16px;
  background-color: rgb(64, 210, 230);
  border-radius: 50px;
  float: left;
  /* margin-top: 5px;
  margin-bottom: 4px;
  margin-right: 15px;
  margin-left: 15px; */
  /* 手指移上去触发"手指图标"显示 */
  cursor: pointer;
}


</style>