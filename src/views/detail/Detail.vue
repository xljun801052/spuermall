<template>
  <div id="detail">
    <!-- 详情导航栏部分 -->
    <DetailNavbar class="detail-navbar"></DetailNavbar>

    <Scroll class="detail-scroll-content" ref="detailScroll">
      <!-- 详情轮播图部分 -->
      <DetailSlide :topImageUrls="topImageUrls"></DetailSlide>

      <!-- 详情内容描述折扣等部分 -->
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>

      <!-- 商品详情图片 -->
      <DetailImageInfo
        :detailImageInfo="detailImageData"
        @detailImgLoaded="imgLoaded"
      ></DetailImageInfo>

      <!-- 商品详情参数部分 -->
      <DetailSpeciaficationsInfo
        :speciaficationsInfo="speciaficationsInfo"
      ></DetailSpeciaficationsInfo>
    </Scroll>
    <hr />
  </div>
</template>

<script>
import {
  getGoodsDetailInfo,
  getDetailImageInfo,
  Goods,
} from "network/detailrequest";

import DetailNavbar from "./childComps/DetailNavbar";
import DetailSlide from "./childComps/DetailSlide";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailImageInfo from "./childComps/DetailImageInfo";
import DetailSpeciaficationsInfo from "./childComps/DetailSpeciaficationsInfo";

import Scroll from "components/common/scroll/Scroll";

export default {
  name: "Detail",
  components: {
    DetailNavbar,
    DetailSlide,
    DetailBaseInfo,
    DetailImageInfo,
    DetailSpeciaficationsInfo,
    Scroll,
  },
  data() {
    return {
      goodsId: null,
      topImageUrls: [],
      goods: {},
      detailImageData: [],
      debounceRefresh: {
        type: Function,
      },
      speciaficationsInfo: "",
    };
  },
  created() {
    //  组件创建时，获取商品ID
    this.goodsId = this.$route.params.goodsId;
    // console.log(this.goodsId)

    // 然后根据商品ID去请求商品详情数据
    getGoodsDetailInfo(this.goodsId).then((res) => {
      // console.log(res.data.data[0]);
      let totalInfo = res.data.data[0];
      this.topImageUrls = totalInfo.topBimageUrls.split(",");
      // 如果商品数据过于复杂，在一个子组件中只需要部分，可以考虑将数据封装成对象
      this.goods = new Goods(
        totalInfo.title,
        "desc",
        totalInfo.nowPrice,
        totalInfo.originPrice,
        totalInfo.discountStrategy.split(","),
        totalInfo.serviceStyle.split(",")
      );
    });

    //然后根据商品ID取请求商品详情图片数据
    getDetailImageInfo(this.goodsId).then((res) => {
      console.log(res.data.data[0]);
      this.detailImageData = res.data.data[0];
      this.speciaficationsInfo = res.data.data[0].goodsSpeciafications;
    });
  },
  methods: {
    // 要用防抖动处理一下,失败了...后续研究吧~~
    debounce(func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func(args);
        }, delay);
      };
    },

    // 图片加载完成后，进行scrollHeight的刷新，重新计算可滚动区域高度
    imgLoaded() {
      // this.debounceRefresh();
      // console.log("--------");
      this.$refs.detailScroll.refresh();
    },
  },
  // mounted: {
  //   prepareDebounce() {
  //     this.debounceRefresh = this.debounce(this.$refs.detailScroll.refresh, 50);
  //     console.log(this.debounceRefresh);
  //   },
  // },
};
</script>

<style scoped>
/* 将最下面的tabbar遮盖住 */
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-navbar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.detail-scroll-content {
  height: calc(100%-56px);
}

hr {
  height: 2px;
  background-color: rgb(204, 201, 201);
}
</style>