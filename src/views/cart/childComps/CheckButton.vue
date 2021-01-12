<template>
  <div id="checkbutton">
    <div class="btnCheckimg">
      <img
        src="~assets/img/detail/check.png"
        alt=""
        :class="{ check: isActive }"
      />
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

<style scoped>
.btnCheckimg {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid #ccc;
}

.check {
  background-color: red;
  border-color: red;
}
</style>