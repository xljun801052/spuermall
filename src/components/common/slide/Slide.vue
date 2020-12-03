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
import annnimate from "./animate";
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
  created() {
  },
  mounted() {
    var content = document.getElementById("slideContent");
    var view = document.getElementById("view");
    window.onload = function () {
      //默认第一个选中变红
      let li_div = document.querySelector("#indicator"); 
      // Q5:这个地方结果是空：有人说是没加载出来先取导致...???
      let li_obj = li_div.children;//HTMLCollection []
      console.log(li_obj.length)//0
      var li_arr = []
      for (var i = 0; i < li_obj.length; i++) {
        li_arr.push(li_obj.item(i))
      }

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
          move(view, -this.index * content.offsetWidth);
        };
      }
    };
  },
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