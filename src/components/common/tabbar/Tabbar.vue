<template>
    <div id="tabbar">
        <slot></slot>
    </div>
</template>

<script>
import tabbarItem from './TabbarItem';
export default {
    name:'tabbar',
    components:{
        tabbarItem
    }
}
</script>

<style>
#tabbar{
  display: flex;
  background-color: #f6f6f6;

  position: fixed;
  left: 0;
  right:  0;
  bottom: 0;
}

.tabbar-item{
    flex: 1;
    text-align: center;
    /* 移动端tabbar一般都是49px,以后做PC端可以适当修改 */
    height: 49px;
    /* 盒子间过渡阴影效果 */
    box-shadow: 0, -1px,3px,rgba(100, 100, 100, 1);
}
</style>