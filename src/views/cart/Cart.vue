<template>
  <div id="cart-content">
    <!-- 购物车导航栏部分 -->
    <Navbar class="navbarContent">
      <template v-slot:center>
        <div class="cart-title">购物车({{ length }})</div>
        <!-- 方案1->这种写法：$store.state.cartList.length太长了，在HTML代码中使用并不好，而且复用性也不够 -->
      </template>
    </Navbar>

    <!-- 商品列表部分 -->
    <CartList/>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";
import CartList from "./childComps/CartList";
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    Navbar,
    CartList,
  },
  computed: {
    // cartLength(){
    //   // 方案2->按照vuex的说法：我们应该使用getters来替换计算属性
    //   // return this.$store.state.cartList.length
    //   return this.$store.getters.cartLength
    // }

    // 方案3->按照vuex的最新功能mapGetters：可以将store中的getter直接映射到局部计算属性。【两种使用方式：数组和对象，如果想使用别名，就用对象，否则直接用数组方式即可】
    // 数组写法：名称与getters.js文件中的方法名对应即可
    // ...mapGetters(['cartLength','cartList'])
    // 对象写法：用于起别名
    ...mapGetters({
      length: "cartLength",
    }),
  },
};
</script>

<style scoped>
.navbarContent {
  background-color: rgb(248, 93, 196);
  font-size: 25px;
  font-weight: 700;
}

.cart-title {
  color: #fff;
}
</style>