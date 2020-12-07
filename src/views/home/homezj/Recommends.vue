<template>
  <div id="recommend">
    <div class="recommend-item"
      v-for="(item, index) in recommends"
      :key="index"
    >
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
}

a {
  float: left;
}

.recommend-img {
    width: 150px;
    height: 150px;
    margin: 15px;
}

.recommend-text {
    text-align: center;
    font-size: 25px;
}
</style>