<template>
  <div id="cart-bottombar">
    <CheckButton :isActive="isSelectAll" @click="checkClick"></CheckButton>
    <span class="checkall-text">全选</span>
    <div class="totalprice">
      <span class="totalprice-text">总计：￥{{ totalPrice }}</span>
    </div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    // 使用filter()和reduce()来进行数组数据高阶计算总价
    totalPrice() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((prevalue, item) => {
          return prevalue + item.price * item.count;
        }, 0);
    },
    // 全选按钮的显示逻辑判断
    isSelectAll() {
      // 如果购物车没有商品，默认全选按钮为fals
      if (this.$store.state.cartList.length === 0) return false;
      // 只要找到一个没有选中的，就返回false
    //   console.log(
    //     this.$store.state.cartList.find((item) => {
    //       !item.check;
    //     })
    //   );
      return this.$store.state.cartList.find((item) => {
        !item.check;
      });
    },
    //   let cartList = this.$store.state.cartList;
    //   cartList.forEach((item) => {
    //     if (!item.check) {
    //       return false;
    //     }
    //   });
    //   return true;
    // },
  },
  methods: {
    //  全选按钮的点击
    checkClick() {
      // 全部选中的情况下点击处理
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach((element) => {
          element.check = false;
        });
      } else {
        // 有没有选中的商品的情况下点击处理
        this.$store.state.cartList.forEach((element) => {
          element.check = true;
        });
      }
    },
  },
};
</script>

<style scoped>
#cart-bottombar {
  height: 50px;
  background-color: #eee;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 20px;
}

.checkall-text {
  width: 500px;
}

.totalprice-text {
  margin-right: 40px;
}

span {
  margin-left: 20px;
  font-size: 25px;
}
</style>