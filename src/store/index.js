// Vue3.x只能使用Vuex4.x版本，我也是...
// 官网开头介绍：This is the docs for Vuex 4, which works with Vue 3. If you're looking for docs for Vuex 3, which works with Vue 2, please check it out here.

import { createStore } from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const state = {
  // 用来存放添加到购物车的商品
  cartList: []
};
const store = createStore({
  state, //抽取使得这个index.js干净且逻辑清晰
  //   state() {
  //     return {
  //       // 用来存放添加到购物车的商品
  //       cartList: []
  //     };
  //   },

  // mutations的唯一目的就是修改state中的状态，不要把任何复杂的逻辑放在mutations中!!!mutations中每个方法尽可能完成的事件比较单一最好.方便跟踪
  // 异步操作&&复杂逻辑处理可以放在actions中
  mutations, // 抽取到mutations.js文件中使得这个index.js干净且逻辑清晰
  //   mutations: {
  // 默认首个参数就是state，如有额外参数可放在后面
  // addCart(state, payload) {
  //   //   console.log("准备添加新商品----------");
  //   // 对添加进来的商品进行判断是否已经添加过了，添加过了则数量+1，否则即首次添加，将数量置为1即可
  //   let oldProduct = null;
  //   //   写法1：for循环的写法比较low了-_-
  //   //   for (let index = 0; index < state.cartList.length; index++) {
  //   //     if (state.cartList[index].id === payload.id) {
  //   //       oldProduct = state.cartList[index];
  //   //     }
  //   //   }
  //   //  写法2：find函数--->将数组中的每个元素遍历，并当做find()的参数的参数【此处指下方的item】传入，如果参数【回调函数】的返回值为true，则整个find()的函数值就是当前遍历的这个元素
  //   oldProduct = state.cartList.find(item => {
  //     item.id === payload.id; // 此处return可以省略
  //   });
  //   // 已经添加过了
  //   if (oldProduct) {
  //     oldProduct.count += 1;
  //   } else {
  //     //没有添加过【这个地方时ES6新语法：payload.count这样相当于直接给这个payload对象添加一个新的count属性】
  //     payload.count = 1;
  //     state.cartList.push(payload);
  //   }

  //   console.log(state.cartList);
  // }

  // // 数量+1
  // addCount(state, payload) {
  //   payload.count += 1;
  // },

  // // 添加新商品
  // addNew(state, payload) {
  //   state.cartList.push(payload);
  // }
  //   },

  actions, // 抽取到actions.js文件中使得这个index.js干净且逻辑清晰
  //   actions: {
  //     // actions中的方法首个参数得是context
  //     addCart(context, payload) {
  //       //step0：查找之前数组中是否有该商品
  //       let oldProduct = context.state.cartList.find(item => {
  //         item.id === payload.id;
  //       });

  //       //step1：根据oldProduct判断是添加新商品还是数量+1
  //       if (oldProduct) {
  //         // oldProduct.count += 1;
  //         // 调用mutations中方法
  //         context.commit("addCount", oldProduct);
  //       } else {
  //         payload.count = 1;
  //         // context.state.cartList.push(payload);
  //         // 调用mutations中方法
  //         context.commit("addNew", payload);
  //       }
  //     }
  //   }

  getters, // 抽取到getters.js文件中使得这个index.js干净且逻辑清晰
});

export default store;
