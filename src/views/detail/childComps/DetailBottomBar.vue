<template>
  <div id="detail-bottombar">
    <div class="store content" @click="storeClick">
      <div class="store-img" v-if="isStoreActive">
        <img src="~assets/img/detail/store_active.svg" alt="" />
      </div>
      <div class="store-img" v-else>
        <img src="~assets/img/detail/store.svg" alt="" />
      </div>
      <div class="store-text">店铺</div>
    </div>
    <div class="kefu content" @click="kefuClick">
      <div class="kefu-img" v-if="isKefuActive">
        <img src="~assets/img/detail/kefu_active.svg" alt="" />
      </div>
      <div class="kefu-img" v-else>
        <img src="~assets/img/detail/kefu.svg" alt="" />
      </div>
      <div class="kefu-text">客服</div>
    </div>
    <div class="collect content" @click="collectClick">
      <div class="collect-img" v-if="isCollectActive">
        <img src="~assets/img/detail/collect_active.svg" alt="" />
      </div>
      <div class="collect-img" v-else>
        <img src="~assets/img/detail/collect.svg" alt="" />
      </div>
      <div class="collect-text">收藏</div>
    </div>
    <div class="cart content" @click="addToCart">
      <div class="cart-text">加入购物车</div>
    </div>
    <div class="buy content">
      <div class="buy-text">立即下单</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  // 这个点击效果，我也是自己被自己逗乐了...哈哈
  data() {
    return {
      isStoreActive: false,
      isKefuActive: false,
      isCollectActive: false,
    };
  },
  methods: {
    storeClick() {
      this.isStoreActive = !this.isStoreActive;
      this.isKefuActive = false;
      this.isCollectActive = false;
    },
    kefuClick() {
      this.isKefuActive = !this.isKefuActive;
      this.isStoreActive = false;
      this.isCollectActive = false;
    },
    collectClick() {
      this.isCollectActive = !this.isCollectActive;
      this.isStoreActive = false;
      this.isKefuActive = false;
    },

    // 添加到购物车
    addToCart(){
      this.$emit('addToCart')
    }
  },
};
</script>

<style scoped>
#detail-bottombar {
  height: 70px;
  width: 100%;
  background-color: rgb(245, 241, 241);

  display: flex;
  justify-content: space-around;
  align-items: center;

  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 100;
}

.content {
  height: 100%;
  width: 20%;
  justify-content: space-around;
  align-items: center;
}

.store,
.kefu,
.collect {
  padding-top: 10px;
  text-align: center;
}

.cart,
.buy {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-size: 20px;
  display: flex;
  align-items: center;
}

.cart {
  background-color: rgb(247, 223, 90);
  color: rgb(15, 14, 15);
}

.buy {
  background-color: rgb(233, 109, 250);
  color: rgb(229, 226, 229);
}
</style>