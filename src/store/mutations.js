import { ADD_COUNT, ADD_NEW } from "./mutation-types";

export default {
  // 数量+1
  [ADD_COUNT](state, payload) {
    payload.count += 1;
    console.log(state.cartList);
  },

  // 添加新商品
  [ADD_NEW](state, payload) {
    state.cartList.push(payload);
    console.log(state.cartList);
  }
};
