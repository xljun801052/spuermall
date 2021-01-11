<template>
  <div id="checkbuttom">
    <div v-if="isActive">
      <img src="~assets/img/detail/check_active.svg" alt="" />
    </div>
    <div v-else>
      <img src="~assets/img/detail/check.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped`>
img {
  width: 40px;
  height: 40px;
}
</style>