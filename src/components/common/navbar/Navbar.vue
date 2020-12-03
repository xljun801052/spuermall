<template>
    <div class="nav-bar">
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
export default {
    name:'Navbar'
}
</script>

<style>
  .nav-bar {
      display: flex;
      /* 设置height是为了防止没有内容时，line-height不能生效 */
      height: 44px;
      width: 100%;
      line-height: 44px;
      text-align: center;
      /* 向下展示盒子阴影，过渡柔和 */
      box-shadow: 0 1px 1px rgba(100, 100, 100, 0.2);
  }

  /* 左右两边设置前进后退的按钮等 */
  .left, .right {
      width: 60px;
  }

  .center {
      flex: 1;
  }
</style>