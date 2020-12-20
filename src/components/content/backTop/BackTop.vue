<template>
  <div class="back-top">
    <img src="~/assets/img/common/backTop.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
};
</script>

<style>
.back-top {
  position: fixed;
  right: 25px;
  bottom: 70px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: rgb(137, 250, 250);
  opacity: 0.8;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}


.back-top img {
  height: 33px;
  width: 33px;
}
</style>