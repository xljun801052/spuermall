<template>
  <div id="home">
    <!-- navbar部分 -->
    <Navbar id="home_navbar">
      <template v-slot:center>
        <div>首页信息</div>
      </template>
    </Navbar>

    <!-- TabContorl备份部分，用来实现吸顶的平滑过渡 -->
    <TabControl
      :titles="['流行', '新款', '精选']"
      @tabControlClick="changeGoodsList"
      ref="tabControlBak"
      class="tab-control-bak"
      v-show="isAttachToTop"
    ></TabControl>

    <Scroll
      ref="scroll"
      :probe-type="3"
      @scroll="judgeShowBackToTop"
      :pullUpLoad="true"
      @allReadyToCurrentBottom="loadMoreData"
    >
      <!-- slide部分 后面这里需要封装实现自动轮播-->
      <Slide ref="slide">
        <template v-slot:imgContent>
          <!-- 解决v-for报错，加上:key='index'即可 -->
          <li v-for="(item, index) in banners" :key="index">
            <a :href="item.link">
              <img :src="item.image" alt="" @load="slideImgLoaded" />
            </a>
          </li>
        </template>
        <template v-slot:circleContent>
          <li v-for="(item, index) in banners" :key="index"></li>
        </template>
      </Slide>

      <!-- recommends好物推荐部分 -->
      <Recommends :recommends="recommends"></Recommends>

      <!-- 本周流行Features部分 -->
      <Features></Features>

      <!-- TabContorl分类部分 -->
      <TabControl
        :titles="['流行', '新款', '精选']"
        @tabControlClick="changeGoodsList"
        ref="tabControl"
        :class="{ attachToTop: isAttachToTop }"
      ></TabControl>

      <!-- 商品列表GoodsList部分 -->
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>

    <!-- 回到顶部部分 -->
    <!-- Ques:这里BackTop组件的点击事件不需要使用.native，也能生效。可是我记得原来是【组件原生事件不使用.native修饰符是不可以被监听到的！！！vue3.x中改进了？】 -->
    <BackTop @click="backTop" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
// 这里导入时尽量按不同文件夹分类，同时保持顺序并对应注册组件时的顺序
import Navbar from "components/common/navbar/Navbar";
import Slide from "components/common/slide/Slide";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import Recommends from "./childComps/Recommends";
import Features from "./childComps/Features";
import BackTop from "components/content/backTop/BackTop";

import { getLunboData, getHomeGoods } from "network/homerequest";

export default {
  name: "Home",
  components: {
    Navbar,
    Slide,
    TabControl,
    GoodsList,
    Scroll,
    Recommends,
    Features,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {
          page: 0,
          list: [],
          hasMore: true, //添加hasMore判断是否还有数据，如果有，我们就去计算可滚动区域高度值，即调用BScroll的refresh()方法，没有数据就不调用了，优化性能。
        },
        new: {
          page: 0,
          list: [],
          hasMore: true,
        },
        sell: {
          page: 0,
          list: [],
          hasMore: true,
        },
      },
      currentType: "pop",
      isShowBackTop: false, //默认为false,不展示回到顶部图标
      tabControlOffsetTop: 0, //用于计算tabControl组件的离顶距离，从而实现吸顶效果
      isAttachToTop: false, //用于给组件添加是否固定吸顶的样式效果
      saveY:0,  // 记录home离开激活状态时的位置，以便切换回来时直接定位到离开时的位置。
    };
  },
  computed: {
    showGoods() {
      // 原来放在html中（:goods="goods[currentType].list"）太长了，一不美观，二太难理解不便阅读，所以用计算属性取代
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /**
     * ★★★★事件监听相关方法★★★★
     */
    // 改变商品种类
    changeGoodsList(index) {
      //index是子组件抛出自定义事件时传入的参数，这里接收
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 使两个tabControl保持点击结果一致
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControlBak.currentIndex = index;
    },

    // 回到顶部
    backTop() {
      // 这个地方开始y的值为0 但是考虑到BScroll有弹性，且不要硬生生的到顶就停，我们把y的值稍稍设置出去一点点，这样更加柔和~~甚至调整为加载数据越多，回弹的时候更加柔滑，将几个参数设为动态值
      this.$refs.scroll.scrollTo(0, 50, 400);
    },

    // 判断是否显示回到顶部的图标&&判断吸顶
    judgeShowBackToTop(position) {
      // 1、判断回到顶部图标是否显示
      this.isShowBackTop = -position.y > 3000;

      // 2、判断吸顶触发条件:满足的时候就去改变isFixed的值，利用动态绑定改变样式达到吸顶效果
      this.isAttachToTop = -position.y > this.tabControlOffsetTop;
    },

    // 监听轮播图加载完成事件---》》》因为最有可能影响offsetTop属性值的计算就是比较大的图渲染时占据的位置，我们等加载完大图再计算吸顶触发高度(tabControl组件对应的元素的offsetTop值)。
    // 实际开发中，如果有必要，可以监听多个影响的图片加载事件
    slideImgLoaded() {
      // 因为组件是没有offsetTop属性值的，而它对应的元素有offsetTop属性值。我们通过'$el'获取组件渲染后对应的元素【准确来说元素是都具有offsetTop属性值的】
      console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabControlOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },

    // 上拉加载更多数据
    loadMoreData() {
      // 有更多数据就刷新，没有就别做了。
      if (this.goods[this.currentType].hasMore) {
        this.getPageGoods(this.currentType);
        this.$refs.scroll.finishPullUp();
        this.$refs.scroll.refresh();
      } else {
        alert("我是有底线的!!!");
      }

      // 主要是因为better-scroll的滚动区域大小是计算出来的特性+图片异步加载慢特性会产生BUG！正常的话图片加载快，在bscroll计算出可滚动区域高度（由BScroll.scrollerHeight属性记录）之前已经完成图片加载，
      // 则不会产生BUG.如果图片加载慢，那么bscroll计算可滚动区域高度时会根据已加载的组件以及内容来计算高度。这样可滚动区域高度值就变小了，导致往下滚动时出现滚动不了的BUG.所以要手动刷新一下这个bscroll对象
      // 让其重新计算可滚动区域高度（即BScroll.scrollerHeight属性值）便可以解决。【scrollerHeight属性值是根据我们放在BScroll对象中的子组件的高度决定的】
      // 那么问题来了！我们知道图片加载完成去调用BScroll的refresh()方法，但是我们如何知道什么时刻图片加载完成呢？？？
      // 解决：JS原生有img_element.onload = function(){...}这个onload属性会在图片加载完成时进行对应函数操作！Vue中封装了一层，叫load事件，我们只要监听对应的img元素的load事件即可，每当一张
      //      图片加载完成，我们就去调用BScroll的refresh()方法，重新计算可滚动区域高度值，以此来解决这个BUG~~,同时，这里的下面一行代码refresh()调用可以删除了。
      // this.$refs.scroll.refresh()
    },

    /**
     *  ★★★★网络请求相关方法★★★★
     */
    getLunbo() {
      getLunboData().then((res) => {
        // 在请求执行成功后执行回调函数中的内容，回调函数处于其它函数的内部this不会与任何对象绑定，为undefined
        // console.log(res.data.banner.list);
        this.banners = res.data.banner.list; //Q3:为什么这里不用this.data.banners?
        this.recommends = res.data.recommend.list; //Q3:为什么这里不用this.data.banners?
        // 请关注一下这个this.$nextTick(()=>{})!!!:将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。
        // https://www.cnblogs.com/jin-zhe/p/9985436.html
        this.$nextTick(() => {
          this.$refs.slide.beginRender();
        });
      });
    },

    getPageGoods(type) {
      let page = this.goods[type].page;
      // console.log(page);
      getHomeGoods(type, page).then((res) => {
        // console.log(res.data.data.length);
        // 有数据我们就去更新数据，没有数据就不要继续做了
        if (res.data.data.length > 0) {
          // arr1.push(...arr2):这种语法可以将arr2中每一个元素依次放到arr1中去。避免遍历写法麻烦
          this.goods[type].list.push(...res.data.data);
          this.goods[type].page += 1;
        } else {
          this.goods[type].hasMore = false;
        }
      });
    },

    /**
     *  ★★★★性能优化方法★★★★
     */
    // 防抖动函数:将请求特别频繁的方法用定时器包装一下，下一次调用的比较快就将上一次调用在定时器执行之前取消，重新设置定时器达到降低调用频率的效果！优秀~
    debounce(func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func(args);
        }, delay);
      };
    },
  },

  /**
     *  ★★★★Vue组件自带函数★★★★
     */
  //发送请求拿数据,随后用data保存.因为create函数是个比较特殊的函数，所以我们一般不在这个里面写实现逻辑，而是抽取出到methods中
  // Q2:created()函数中this作用域是从里往外找的？created()中this指向当前组件对象
  created() {
    // 1、请求多模块数据
    this.getLunbo();

    // 2、请求商品数据
    this.getPageGoods("pop");
    this.getPageGoods("new");
    this.getPageGoods("sell");
  },

  mounted() {
    const debouncedRefresh = this.debounce(this.$refs.scroll.refresh, 50);
    // 1、监听事件总线中imgLoaded事件，来调用BScroll对象的refresh()方法进行可滚动区域高度重新计算
    // 一、这个方法再放mounted里面就是为了避免放在created()里面时，用this.$refs取值取不到的情况！

    //attention!!!这里的事务总线$bus的函数emit和on是来源于mitt,而不是vue,不需要使用$符号
    this.$bus.on("imgLoaded", () => {
      // 一、这里用逻辑'与'做一层连接，是为了防止BScroll对象生成的太慢导致调用refresh()的时候还是null从而引起报错！这个经常会出现，一定要注意，尤其是一些明明有的API方法调用报错！！！这样的写法
      //     使程序相对稳定！！！一旦前面this.$refs.scroll为null或者undefined时,结果是false，那么根据逻辑'与',后面的refresh()方法不会执行调用，也不会报错！
      // 二、这里的refresh()函数调用太频繁，我们用防抖操作来优化一下性能！实际项目也常用，比如做实时搜索，百度里面你输入一个字符他就去根据这个字符请求后台数据，输入发生变化立马请求后台...这种服务器压力太大
      //     也会使用防抖来进行请求频率/函数调用频率优化【防抖函数：debounce;节流函数：throttle】
      // this.$refs.scroll && this.$refs.scroll.refresh();
      debouncedRefresh();
    });

    // 计算tabControl组件的offsetTop值
    // $el：vue所有组件都具有的一个属性，用来获取组件渲染后对应的元素【因为this.$refs.tabControl拿到的是组件，组件是没有offsetTop属性值的，必须通过他的元素来获取】
    // 但是在mounted()里面计算，有可能因为图片异步加载导致计算高度不准确！所以要监听一下主要影响的图片(主要是轮播图)的加载完成事件，然后计算这个offsetTop属性值
    // this.tabControlOffsetTop = this.$refs.tabControl.$el.offsetTop
  },

  // destroyed(){
  //   console.log("home组件销毁...")
  // },

  // 组件进入激活状态时调用
  activated(){
    console.log("进入home...")
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },

  // 组件离开激活状态时调用
  deactivated(){
    console.log("离开home...")
    this.saveY = this.$refs.scroll.getScrollY()
    console.log("saveY:"+this.saveY)
  },
};
Navbar;
</script>
 

<style scoped>
/*设置scoped表示这些样式指着对当前组件起作用，不会对其他地方起作用。即便是组件渲染后的替换的内部元素也不使用这些样式，不会受影响。比如Scroll上有个class为content，渲染替换后，
整个Scroll被换成<div><div class="contnet"></div></div>，那么这个有class为content的div也不会受影响。如果不加scoped，那么全局DOM中只要有class属性值为content的元素样式就会受影响了。*/

.home {
  padding-top: 44px;
  /* vh：viewport height视口。100vh表示100%视口高度。50vh表示50%视口高度。 */
  height: 100vh;
  position: relative;
}

/* 针对首页的navbar特定设置，抽取于navbar组件之外 */
#home_navbar {
  font-size: 25px;
  background-color: #fb7299;
  color: white;

  /* 将其位置固定(脱离常规流)，结合最外层的padding-top 实现不随滚动条滚动--->这是在原生滚动的情况下避免home-navbar随网页内容一起滚动才设置的属性。使用Better-Scroll后就不需要了 */
  /* position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  z-index: 1; */
}

.slide-view {
  display: flex;
  text-align: center;
  top: 44px;
}

/* 吸顶样式实现1，position根据top的值来动态决定，达到44px时变成position:fixed */
/* 不过当应用到Better-Scroll中时也失去原来的效果了，所以不用了 */
/* .tab-control { */
/* 不过目前Chrome不能生效，后面研究！https://developers.weixin.qq.com/community/develop/doc/00086c29bdcba816bf2968f7d5fc00 */
/* https://blog.csdn.net/qq_35585701/article/details/81040901 */
/* position: sticky; */
/* top: 44px; */
/* } */

/* 吸顶样式实现2 */
/* fixed：会脱离标准流 。这个方案采用之后，tabControl吸顶有两个问题：①过渡不平滑②虽然设置了fixed属性，但是还是会因为better-scroll的transform的translate属性值改变一起滚出去了。没法固定位置，所以弃用！*/
/* .fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */

/* 吸顶样式实现3 */
/* z-index：只有在元素有position定位后此属性才生效！我们用position：relative,z-index置于最顶层来实现平滑过渡吸顶。这个方案采用之后,tabControl吸顶实际由备份tabControl的动态展示/隐藏来实现
实现细节：当用户滚动到触发吸顶效果时，我们让tabControlBak显示出来，当没有触发吸顶效果时，我们让tabControlBak隐藏起来。
*/
.tab-control-bak {
  position: relative;
  z-index: 9;
}

/* 计算better-scroll控制的滚动区域的高度。这种是利用CSS3动态计算,减去顶部navbar和底部的49px部分内容，不够简便 */
/* .hoem-scroll-content {
  height: calc(100% - (44+49)px);
  overflow: hidden;
  margin-top: 44px;
} */

#img_content {
  width: 100%;
}

.img {
  float: left;
  height: 360px;
  width: 32%;
  background-size: cover;
}
.img img {
  width: 100%;
  height: 100%;
  display: block;
}

/* 吸顶实现方案一、
      因为BScroll是根据内联样式style="transform: translateX(0px) translateY(-1045px) translateZ(1px);来实现滚动。这个translateY轴属性值即便我们设置了tabControl的position为fixed
      也是会被改变的，当滚动时就被移动到很上面去了。不会吸顶留在顶部！所以此方案失败，不可用！ */
/* .attachToTop {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */

/* ♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣Slide中的样式♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣ */
#img-view li {
  float: left;
  list-style: none;
}

#indicator-view li {
  width: 16px;
  height: 16px;
  background-color: rgb(212, 123, 212);
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