<template>
  <div id="recommend">
    <div class="recommend-item"
      v-for="(item, index) in recommends"
      :key="index"
    >
      <!-- Q:为什么这个渲染出来的a标签在img的下面而不是涵盖img标签呢？ -->
      <a :href="item.link">
        <img :src="item.image" alt="推荐好物" class="recommend-img"/>
        <div class="recommend-text">{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommends",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
/* todo:此处样式不是对齐的，后面再调整吧！ */
#recommend {
    width: 100%;
    /* border-bottom: 3px solid grey; */
    display: flex;
}

/* 结合父元素中的display:flex,实现图片水平居中 */
.recommend-item {
  display: flex;
  flex: 1;
  justify-content: center;
}

/* a {
  float: left;
} */

.recommend-img {
    width: 150px;
    height: 150px;
    margin-top: 15px;
    margin-bottom: 15px;
    /* text-align: center;
    vertical-align: middle;
    display: table-cell; */
     /* display:inline-table; 

     vertical-align: middle; */
}

.recommend-text {
    text-align: center;
    font-size: 27px;
}
</style>