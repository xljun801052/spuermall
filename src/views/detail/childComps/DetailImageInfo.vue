<template>
  <!-- 这里可以用：v-if="Obejct.keys(detailImageInfo).length!==0"来保证没有数据的时候不加载，有数据再加载渲染 -->
  <div id="detail-imageinfo" v-if="Object.keys(detailImageInfo).length !== 0">
    <div class="detail-img-title">{{imageTitle}}</div>
    <div
      v-for="(imglink, index) in imageLinks"
      :key="index"
      class="image-content"
    >
      <img :src="imglink" alt="详情图" @load="detailImgLoaded" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailImageInfo",
  props: {
    // 这个地方以对象接收，而不是数组。是因为图片信息应该包含分类，比如卖家展示的详情图加文字说明，细节做工的详情图加额外信息，所以考虑到这些，用对象而非数组更好
    detailImageInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      // 我们这个图片详情组件面向detailImage这个数据封装对象开发！将父组件传过来的detailImage进行数据拆分
      imageLinks: null,
      imageTitle:"",
    };
  },
  // 父组件将数据给到子组件如果父组件的数据是异步获取的，那么这个时候很有可能造成子组件通过props拿到的值是undefined，我们可以用watch来监控数据变化重新渲染解决！
  watch: {
    detailImageInfo: function () {
      // console.log(this.detailImageInfo.goodsDetailImageUrls);
      this.imageLinks = this.detailImageInfo.goodsDetailImageUrls.split(",");
      this.imageTitle = this.detailImageInfo.goodsDesc
    },
  },
  methods: {
    // 通知父组件图片加载完成,以便重新是刷新可滚动区域高度
    detailImgLoaded() {
      this.$emit("detailImgLoaded");
    },
  },
};
</script>

<style scoped>
#detail-imageinfo{
  margin: 15px 0px;
  border-top: 2px solid  deeppink;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.detail-img-title {
  text-align: center;
  font-size: 40px;
  color: black;
  margin: 15px 0px;
}

img {
  width: 100%;
}
</style>