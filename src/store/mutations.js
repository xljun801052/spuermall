import { ADD_COUNT, ADD_NEW } from "./mutation-types";

export default {
  // 数量+1
  [ADD_COUNT](state, payload) {
    payload.count += 1;
    console.log(state.cartList);
  },

  // 添加新商品
  [ADD_NEW](state, payload) {
    // 在模型中约定改变选中与不选中的状态的属性
    payload.check = true;
    state.cartList.push(payload);
    // console.log(state.cartList);
  }
};
