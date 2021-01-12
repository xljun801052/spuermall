<template>
  <div id="cartListItem">
    <!-- 根据模型的属性来决定是否选中，改变的时候也是改变模型的属性 -->
    <CheckButton @click="changeActive" :isActive="product.check"></CheckButton>
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
  components: {
    CheckButton,
  },
  methods: {
    changeActive() {
      this.product.check = !this.product.check;
    },
  },
};
</script>

<style scoped>
#cartListItem {
  width: 100%;
  display: flex;
  justify-content: space-around;
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
  width: 580px;
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