import { ADD_COUNT, ADD_NEW } from "./mutation-types";

export default {
  addCart(context, payload) {
    //step0：查找之前数组中是否有该商品
    let oldProduct = context.state.cartList.find(item => {
      return item.id === payload.id;
    });

    //step1：根据oldProduct判断是添加新商品还是数量+1
    if (oldProduct) {
      // oldProduct.count += 1;
      // 调用mutations中方法
      context.commit(ADD_COUNT, oldProduct);
    } else {
      payload.count = 1;
      // context.state.cartList.push(payload);
      // 调用mutations中方法
      context.commit(ADD_NEW, payload);
    }
  }
};
