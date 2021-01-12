<template>
  <div id="cartList">
    <Scroll class="cartlist_content">
      <CartListItem
        v-for="(item, index) in cartList"
        :key="index"
        :product="item"
      />
    </Scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";
import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
};
</script>

<style scoped>
#cartList {
  /* calc 必须计算参与值之间由空格分开 ，另外这里减去顶部CartNavbar(44px)、tabbar(55px)、CartBottomBar(50px) */
  height: calc(100vh - 44px - 55px - 50px);
}

.cartlist_content {
  height: calc(100vh - 44px - 55px - 50px);
  overflow: hidden;
}
</style>