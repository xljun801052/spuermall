<template>
  <div id="goodslist">
      <GoodsListItem v-for="(goodItem,index) in goods" :goodItem="goodItem" :key="index">
      </GoodsListItem>
  </div>
</template>

<script>
import GoodsListItem from "components/content/goods/GoodsListItem"

export default {
    name:"GoodsList",
    components:{
        GoodsListItem
    },
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
    #goodslist {
        display: flex;
        /* flex-wrap：会根据子元素的宽度决定一行放几个 */
        flex-wrap: wrap;
        /* 使内容均等分展示 */
        justify-content: space-around;
        padding-bottom: 49px;
        overflow: hidden;
    }
</style>