<template>
  <div class="features">
      <a href="">
          <img src="~assets/img/features/feature2.jpg"  class="features-img">
      </a>
  </div>
</template>

<script>
export default {
    name:"Features"
}
</script>

<style>
    .features {
        width: 100%;
        position: relative;
        top: 20px;
    }

    /* 宽度自适应视口宽度后，这个高度会等比例放大 */
    .features-img {
        width:100%;
        border-radius: 20%;
    } 
</style>