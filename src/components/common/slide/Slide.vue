<!-- 轮播图组件 -->
<template>
  <div id="slideContent">
    <ul id="view">
      <div>
        <slot name="imgContent"></slot>
      </div>
    </ul>
    <ol>
      <div id="indicator">
        <slot name="circleContent"></slot>
      </div>
    </ol>
  </div>
</template>

<script>
import {animate} from "./animate";
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
    return {};
  },
  methods: {
    beginRender() {
      var content = document.getElementById("slideContent");
      var view = document.getElementById("view");
      //默认第一个选中变红
      let li_div = document.getElementById("indicator");
      // firstChild:会拿到元素标签中的空白节点(#text); firstElementChild:获取第一个非元素标签中的空白节点的子元素，但是在IE6、7、8中不兼容;使用children[0]，既可获取第一个非空白子元素，也完全在主流浏览器中均实现兼容
      let default_active = li_div.firstElementChild
      default_active.className = "active"
      // console.log(li_div.children[0]);
      // console.log(li_div.children);

      //初始化:给每一个注册事件，点击时变红,点击时移动图片
      var li_list = document.querySelectorAll("ol li");
      for (var i = 0; i < li_list.length; i++) {
        li_list[i].index = i;
        li_list[i].onclick = function () {
          for (var j = 0; j < li_list.length; j++) {
            li_list[j].className = "";
          }
          this.className = "active";
          console.log("点击时索引:" + this.index);
          animate(view, -this.index * content.offsetWidth);
        };
      }
    },
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
  /* Q3:宽高考虑自适应 */
  width: 100%;
  height: 390px;
  position: relative;
  /* border: 1px solid black; */
  overflow: hidden;
}
ul {
  /* 根据图片张数设置 Q4：如何动态？*/
  width: 400%;
  position: absolute;
}
ul li {
  list-style: none;
  float: left;
}
ol {
  /* width: 300px; */
  height: 25px;
  background-color: grey;
  /* margin-left: 20px; */
  margin-top: 20px;
  list-style: none;
  border-radius: 50px;
  position: absolute;
  /*left+transform让圆点框居中显示*/
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
}
ol li {
  width: 16px;
  height: 16px;
  background-color: pink;
  border-radius: 50px;
  float: left;
  margin-top: 4px;
  margin-bottom: 4px;
  margin-right: 15px;
  margin-left: 15px;
  cursor: pointer;
}

.active {
  background-color: red;
}
</style>