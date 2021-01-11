export default {
    // getters中的方法也默认以state作为首个参数传入
    cartLength(state){
        return state.cartList.length
    },
    cartList(state){
        return state.cartList
    }
}