// 混入(mixin)脚本代码--->生命周期函数可以抽到混入中，这样最后组件的生命周期函数会和引入的混入生命周期函数合并。methods里面的函数内部的东西不可以抽取到混入的。methods中的函数
// 是可以抽取出来到混入中的，提高复用性！

import BackTop from "components/content/backTop/BackTop";

export const bakcTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    };
  },
  methods: {
    // 回到顶部
    backTop() {
      // 这个地方开始y的值为0 但是考虑到BScroll有弹性，且不要硬生生的到顶就停，我们把y的值稍稍设置出去一点点，这样更加柔和~~甚至调整为加载数据越多，回弹的时候更加柔滑，将几个参数设为动态值
      this.$refs.scroll.scrollTo(0, 50, 400); //混入后，scrollTo()方法报错..后续研究吧，先不用混入了
    }
  }
};
