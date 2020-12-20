<!-- 轮播图组件 -->
<template>
  <div id="slideContent">
    <ul id="img-view">
      <slot name="imgContent"></slot>
    </ul>
    <ol id="indicator-view">
      <!-- <div id="indicator"> -->
      <slot name="circleContent"></slot>
      <!-- </div> -->
    </ol>
  </div>
</template>

<script>
import { animate } from "./animate";
export default {
  name: "Slide",
  //通过外部传参控制Slide的属性：loop（循环轮播）、autoPlay（自动轮播）、interval（轮播时间间隔）、snapThreshold（切换轮播图片阈值）
  props: {
    loop: {
      type: Boolean,
      default: true,
    },
    autoPlay: {
      type: Boolean,
      default: true,
    },
    interval: {
      type: Number,
      default: 3000,
    },
    snapThreshold: {
      type: Number,
      default: 0.3,
    },
  },
  data() {
    return {
      isLunboImgLoaded: false,
    };
  },
  methods: {
    // 开始渲染
    beginRender() {
      var content = document.getElementById("slideContent");
      var imgContainer = document.getElementById("img-view");
      //默认第一个选中变红
      let indicatorContainer = document.getElementById("indicator-view");
      // firstChild:会拿到元素标签中的空白节点(#text); firstElementChild:获取第一个非元素标签中的空白节点的子元素，但是在IE6、7、8中不兼容;使用children[0]，既可获取第一个非空白子元素，也完全在主流浏览器中均实现兼容
      let defaultActiveIndicator = indicatorContainer.firstElementChild;
      defaultActiveIndicator.className = "active";
      // console.log(li_div.children[0]);
      // console.log(li_div.children);
      //初始化:给每一个注册事件，点击时变红,点击时移动图片
      var indicatorList = document.querySelectorAll("ol li");
      for (var i = 0; i < indicatorList.length; i++) {
        indicatorList[i].index = i;
        indicatorList[i].onclick = function () {
          for (var j = 0; j < indicatorList.length; j++) {
            indicatorList[j].className = "";
          }
          this.className = "active";
          // console.log("点击时索引:" + this.index);
          animate(imgContainer, -this.index * content.offsetWidth);
        };
      }
    },

    // 优化轮播图加载完成发送事件：我们最终目的是加载完成获取tabControl的offsetTop属性值。只需要一张图加载完发送事件即可，剩余的不需要再发送事件和监听了，浪费性能！
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
/* @import url(); 引入css类 */
* {
  margin: 0;
  padding: 0;
}

#slideContent {
  /* 这里四张图，否则浮动有问题 */
  width: 100%;
  /* 貌似图片撑不起来这个高度 */
  height: 390px;
  position: relative;
  /* border: 1px solid black; */
  overflow: hidden;
}

ul {
  /* width百分比是按父元素的content的width来计算的，不包含border、padding之类的宽度 */
  width: 400%;
  /* Ques:我不设置它高度会变成394，比预计的多了4个像素... */
  height: 390px;
  position: absolute;
}

/* Ques:此li死活不生效，会被浏览器默认样式user agent stylesheet取代导致样式失效。到底什么原因也搞不清(我在父元素中使用样式解决) */
/* ul li {
  list-style: none;
  float: left;
} */

ol {
  width: 300px;
  height: 25px;
  background-color: rgb(216, 204, 204);
  /* margin-left: 20px; */
  /* margin-top: 20px; */
  list-style: none;
  border-radius: 50px;
  position: absolute;
  bottom: 20px;
  /*left+transform让圆点框居中显示*/
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.7;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

/* ol li {
  width: 16px;
  height: 16px;
  background-color: rgb(63, 24, 236);
  border-radius: 50px;
  float: left;
  margin-top: 4px;
  margin-bottom: 4px;
  margin-right: 15px;
  margin-left: 15px;
  cursor: pointer;
} */

/* 点中激活时圆点背景色边成红色显示 */
.active {
  background-color: rgb(255, 4, 16);
}
</style>