<template>
  <div id="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      // 当默认值为对象或者数组的时候，这里的default必须为一个函数！！！
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      // 将点击事件tabControlClick(自定义事件名字随意，但是外面监听时写的也必须是监听的这个事件名字)传出去，Home组件拿到这个事件后切换商品展示内容
      this.$emit("tabControlClick", index);
    },
  },
};
</script>

<style>
#tab-control {
  position: relative;
  top: 10px;
  display: flex;
  background-color: #fff;
  /* 想让商品往下一点 设置这个margin-bottom得结合下层div的padding-top使用，也是醉了 */
  margin-bottom: 10px;
}

.tab-control-item {
  display: flex;
  flex: 1;
  justify-content: center;
}

.tab-control-item span {
  font-size: 30px;
}

.active {
  /* Q:思考一下这里为什么用变量不能引入实现变色： color:var(--color-text) */
  color: deeppink;
}

.active span {
  padding: 0px 5px 5px 7px;
  border-bottom: 3px solid deeppink;
}
</style>