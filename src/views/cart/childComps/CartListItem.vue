<template>
  <div id="cartListItem">
    <!-- <div @click="changeActive">
      <CheckButton :isActive="isActive"></CheckButton>
    </div> -->
    <div class="item-img">
      <img :src="product.image" alt="商品图" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="info-bottom">
        <div class="item-price">{{ product.price }}</div>
        <div class="item-count">x {{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";

export default {
  name: "CartListItem",
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
//   data() {
//     return {
//       isActive: false,
//     };
//   },
  components: {
    CheckButton,
  },
//   methods:{
//       changeActive(){
//           this.isActive = !this.isActive
//       }
//   }
};
</script>

<style scoped>
#cartListItem {
  width: 100%;
  display: flex;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-img img {
  width: 120px;
  height: 160px;
  display: block;
  border-radius: 5px;
}

.item-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-info {
  position: relative;
  width: 620px;
  padding-left: 3px;
  font-size: 25px;
}

.info-bottom {
  display: flex;
  width: 100%;
  position: absolute;
  bottom: 3px;
  justify-content: space-between;
}

.item-count {
  padding-right: 5px;
}
</style>