<template>
  <div id="toast" v-show="isShow">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    message: {
      type: String,
      default: "空空如也~",
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
#toast {
  position: fixed;
  padding: 8px 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 20px;
  border-radius: 5px;
  background-color: rgb(0, 0, 0, 0.75);
}
</style>