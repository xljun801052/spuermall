<template>
  <div id="detail">
    <!-- 详情导航栏部分 -->
    <DetailNavbar
      class="detail-navbar"
      @navbarClick="navbarClick"
      ref="navbar"
    ></DetailNavbar
    ><!-- 监听点击事件获取子组件传过来的参数不需要再这里写成@navbarClick="navbarClick(index)" -->

    <Scroll
      class="detail-scroll-content"
      ref="detailScroll"
      @scroll="contentScroll"
    >
      <!-- 详情轮播图部分 -->
      <DetailSlide :topImageUrls="topImageUrls"></DetailSlide>

      <!-- 详情内容描述折扣等部分 -->
      <DetailBaseInfo :goods="goods" ref="baseInfo"></DetailBaseInfo>

      <!-- 商品详情图片 -->
      <DetailImageInfo
        :detailImageInfo="detailImageData"
        @detailImgLoaded="imgLoaded"
        ref="imageInfo"
      ></DetailImageInfo>

      <!-- 商品详情参数部分 -->
      <DetailSpeciaficationsInfo
        :speciaficationsInfo="speciaficationsInfo"
        ref="specificationsInfo"
      ></DetailSpeciaficationsInfo>
    </Scroll>

    <!-- 回到顶部按钮 -->
    <BackTop @click="backTop" v-show="isShowBackTop"></BackTop
    ><!-- 这里并没有使用组件原生点击事件(用了报错的-_-)：即 @click.native="backTop"-->

    <!-- 详情底部栏部分 -->
    <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
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
import DetailBottomBar from "./childComps/DetailBottomBar";

import BackTop from "components/content/backTop/BackTop";
import Scroll from "components/common/scroll/Scroll";

import { BACK_TOP } from "common/const";

// import {bakcTopMixin} from "common/mixin"

export default {
  name: "Detail",
  components: {
    DetailNavbar,
    DetailSlide,
    DetailBaseInfo,
    DetailImageInfo,
    DetailSpeciaficationsInfo,
    DetailBottomBar,
    BackTop,
    Scroll,
  },
  // mixins:[bakcTopMixin],
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
      themeTopYs: [],
      // 做navbar的联动效果的防抖函数
      getThemeTopY: null,
      // 使用currentIndex来避免反向联动赋值过于频繁
      currentIndex: 0,
      // 决定是否回到顶部
      isShowBackTop: false,
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

      // 做navbar的联动效果防抖函数
      this.getThemeTopY = this.debounce(() => {
        this.themeTopYs = []; // 我们放在updated()生命周期回调函数中的时候防止调用多次会给 this.themeTopYs传入过多的值，所以每次调用传值前清空上一次的旧值
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.baseInfo.$el.offsetTop);
        this.themeTopYs.push(this.$refs.imageInfo.$el.offsetTop);
        this.themeTopYs.push(this.$refs.specificationsInfo.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        console.log(this.themeTopYs);
      }, 200);
    });

    //然后根据商品ID取请求商品详情图片数据
    getDetailImageInfo(this.goodsId).then((res) => {
      // console.log(res.data.data[0]);
      this.detailImageData = res.data.data[0];
      this.speciaficationsInfo = res.data.data[0].goodsSpeciafications;

      // 方案3：将每个topY的值计算出来后赋给themeTopYs---》》》这里不能直接使用，因为此时this.$refs.baseInfo/imageInfo/specificationsInfo可能是undefined,压根没有渲染导致数据不正确。
      // this.themeTopYs = [] // 我们放在updated()生命周期回调函数中的时候防止调用多次会给 this.themeTopYs传入过多的值，所以每次调用传值前清空上一次的旧值
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.baseInfo.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.imageInfo.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.specificationsInfo.$el.offsetTop)
      // console.log(this.themeTopYs)

      //方案4：使用this.$nextTick()函数->// 在渲染整个视图之后运行的回调代码---》》》不适用，图片还是没有加载完成的！所以算出来的高度还是不对。尽管此时DOM已经渲染完了。

      // 这里有一个BUG：就是我们获取这个offsetTop值时，发现第二个和第三个数据一直都是undefined...我嘞个大草!
      // 比如：Proxy {0: 0, 1: undefined, 2: undefined, 3: 827}尽管最后一个offsetTop数据不对，但是它总归有高度数据。
      // 打印了一下：
      // console.log(this.$refs.baseInfo.$el);--->>>  #text
      // console.log(this.$refs.imageInfo.$el);--->>> #text
      // console.log(this.$refs.specificationsInfo.$el);--->>>  <table>...</table>
      // 然而中间两个是为啥是#text而最后一个是table标签？查了一个帖子就一句话说：说明是组件下有多个节点，只能有一个节点
      // 于是我将组件的template标签下多放了一层div再做一层根标签，然后就正常了...-_-||
      // TODO：问题是，最后一个子组件也只有一个table做根标签呀，为啥就可以呢？反正总算是解决了，具体为什么再研究吧~~

      // this.$nextTick(() => {
      //   this.themeTopYs = []; // 我们放在updated()生命周期回调函数中的时候防止调用多次会给 this.themeTopYs传入过多的值，所以每次调用传值前清空上一次的旧值
      //   this.themeTopYs.push(0);
      //   // console.log(this.$refs.baseInfo.$el);
      //   this.themeTopYs.push(this.$refs.baseInfo.$el.offsetTop);
      //   // console.log(this.$refs.imageInfo.$el);
      //   this.themeTopYs.push(this.$refs.imageInfo.$el.offsetTop);
      //   // console.log(this.$refs.specificationsInfo.$el);
      //   this.themeTopYs.push(this.$refs.specificationsInfo.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });
    });
  },
  methods: {
    // 要用防抖动处理一下,失败了...后续研究吧~~
    debounce(func, delay = 50) {
      // delay=50：这个是ES6的新语法，设置参数默认值！
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

      // 方案5：在图片加载完成之后进行offsetTop值获取，这样就对了~~
      // TODO：后续优化性能可以使用防抖避免这个执行太多遍，
      // this.themeTopYs = []; // 我们放在updated()生命周期回调函数中的时候防止调用多次会给 this.themeTopYs传入过多的值，所以每次调用传值前清空上一次的旧值
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.baseInfo.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.imageInfo.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.specificationsInfo.$el.offsetTop);
      // console.log(this.themeTopYs);

      // 方案6：防抖优化后...OK
      this.getThemeTopY();
    },

    // 监听点击，获取索引以便生成联动
    navbarClick(index) {
      // console.log(index)
      this.$refs.detailScroll.scrollTo(0, -this.themeTopYs[index], 200);
    },

    // 监听滚动，根据当前滚动高度进行反向联动，同时决定回到顶部按钮的展示与隐藏
    contentScroll(position) {
      // console.log(-position.y);
      const positionY = -position.y;
      const tlength = this.themeTopYs.length;
      // 我们之前正向联动的时候获取的值{0: 0, 1: 405, 2: 646, 3: 12381}
      // 这里判断逻辑如下：通过index决定联动
      // 当positionY在0~405之间，我们的index应该为0
      // 当positionY在405~646之间，我们的index应该为1
      // 当positionY在646~12381之间，我们的index应该为2
      // 当positionY大于12381，我们的index应该为3
      // 使用ES6增强for来遍历【有个小地方需要注意：ES6增强for遍历的结果是string类型！！！如果需要的话，可以用全局函数parseInt()转换一下】
      // for (let i in this.themeTopYs) // 最初的增强for
      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        // console.log(typeof(i))// string

        if (
          // 这个判断条件太麻烦了...我们利用补全思想优化一下，在this.themeTopYs中push一个非常大的值：Math.MAX_VALUE,缩减一个遍历长度即可
          // 最初判断条件：
          // (this.currentIndex !== parseInt(i) &&
          //   parseInt(i) < tlength - 1 &&
          //   this.themeTopYs[parseInt(i)] <= positionY &&
          //   positionY < this.themeTopYs[parseInt(i) + 1]) ||
          // (i == tlength - 1 && this.themeTopYs[parseInt(i)] <= positionY)

          // 优化后的判断条件：
          this.currentIndex !== parseInt(i) &&
          this.themeTopYs[parseInt(i)] <= positionY &&
          positionY < this.themeTopYs[parseInt(i) + 1]
        ) {
          // console.log(parseInt(i));
          // 反向思考一下来进行赋值，避免给子组件传值过于频繁~~提高性能
          this.currentIndex = parseInt(i);
          // console.log(this.currentIndex);
          // 给子组件数据赋值，传index,实现反向联动~~OK
          // 注意!!!this.$refs.ref_name后面可以直接跟组件的data中的数据进行访问的~~
          this.$refs.navbar.currentIndex = parseInt(i);
        }
      }

      // 判断是否展示回到顶部按钮【回到顶部的阈值可以设置成一个常量!!!】
      this.isShowBackTop = -position.y > BACK_TOP;
    },

    // 回到顶部
    backTop() {
      this.$refs.detailScroll.scrollTo(0, 50, 300);
    },

    // 点击添加到购物车
    addToCart() {
      // console.log("添加到购物车...")

      // 准备对象封装添加到购物车的商品数据
      const product = {};
      product.image = this.topImageUrls[0];
      product.title = this.goods.title;
      product.price = this.goods.price;
      product.id = this.goodsId;
      // console.log(product)

      // 将商品数据发送到Vuex中【不同组件间需要全局共享的数据，我们一般放到Vuex中，这样共享很方便~_~】
      
    },
  },
  mounted() {
    // prepareDebounce() {
    //   this.debounceRefresh = this.debounce(this.$refs.detailScroll.refresh, 50);
    //   console.log(this.debounceRefresh);
    // },
    //方案1:将每个topY的值计算出来后赋给themeTopYs---》》》这里不适用，因为此时this.$refs.baseInfo/imageInfo/specificationsInfo可能是undefined,异步获取的数据没有给到子组件
    // this.themeTopYs.push(0)
    // this.themeTopYs.push(this.$refs.baseInfo.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.imageInfo.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.specificationsInfo.$el.offsetTop)
    // console.log(this.themeTopYs)
  },
  // Vuejs.org：由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。不知道为啥，我这里反正没有被调用到!
  updated() {
    //方案2:将每个topY的值计算出来后赋给themeTopYs---》》》这里不适用，此时应该会有数据的！因为此时this.$refs.baseInfo/imageInfo/specificationsInfo可能是undefined,压根没有渲染导致数据不正确。
    // this.themeTopYs = [] // 我们放在updated()生命周期回调函数中的时候防止调用多次会给 this.themeTopYs传入过多的值，所以每次调用传值前清空上一次的旧值
    // this.themeTopYs.push(0)
    // this.themeTopYs.push(this.$refs.baseInfo.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.imageInfo.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.specificationsInfo.$el.offsetTop)
    // console.log(this.themeTopYs)
  },
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