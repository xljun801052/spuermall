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
.cartlist_content {
  height: calc(100%-440px);
}
</style>