<template>
  <div>
    this is appstore!
    <div class="scroll">
      <ul class="content">
        <li>商品1</li>
        <li>商品2</li>
        <li>商品3</li>
        <li>商品4</li>
        <li>商品5</li>
        <li>商品6</li>
        <li>商品7</li>
        <li>商品8</li>
        <li>商品9</li>
        <li>商品10</li>
        <li>商品11</li>
        <li>商品12</li>
        <li>商品13</li>
        <li>商品14</li>
        <li>商品15</li>
        <li>商品16</li>
        <li>商品17</li>
        <li>商品18</li>
        <li>商品19</li>
        <li>商品20</li>
        <li>商品21</li>
        <li>商品22</li>
        <li>商品23</li>
        <li>商品24</li>
        <li>商品25</li>
        <li>商品26</li>
        <li>商品27</li>
        <li>商品28</li>
        <li>商品29</li>
        <li>商品30</li>
        <li>商品31</li>
        <li>商品32</li>
        <li>商品33</li>
        <li>商品34</li>
        <li>商品35</li>
        <li>商品36</li>
        <li>商品37</li>
        <li>商品38</li>
        <li>商品39</li>
        <li>商品40</li>
        <li>商品41</li>
        <li>商品42</li>
        <li>商品43</li>
        <li>商品44</li>
        <li>商品45</li>
        <li>商品46</li>
        <li>商品47</li>
        <li>商品48</li>
        <li>商品49</li>
        <li>商品50</li>
        <li>商品51</li>
        <li>商品52</li>
        <li>商品53</li>
        <li>商品54</li>
        <li>商品55</li>
        <li>商品56</li>
        <li>商品57</li>
        <li>商品58</li>
        <li>商品59</li>
        <li>商品60</li>
        <li>商品61</li>
        <li>商品62</li>
        <li>商品63</li>
        <li>商品64</li>
        <li>商品65</li>
        <li>商品66</li>
        <li>商品67</li>
        <li>商品68</li>
        <li>商品69</li>
        <li>商品70</li>
        <li>商品71</li>
        <li>商品72</li>
        <li>商品73</li>
        <li>商品74</li>
        <li>商品75</li>
        <li>商品76</li>
        <li>商品77</li>
        <li>商品78</li>
        <li>商品79</li>
        <li>商品80</li>
        <li>商品81</li>
        <li>商品82</li>
        <li>商品83</li>
        <li>商品84</li>
        <li>商品85</li>
        <li>商品86</li>
        <li>商品87</li>
        <li>商品88</li>
        <li>商品89</li>
        <li>商品90</li>
        <li>商品91</li>
        <li>商品92</li>
        <li>商品93</li>
        <li>商品94</li>
        <li>商品95</li>
        <li>商品96</li>
        <li>商品97</li>
        <li>商品98</li>
        <li>商品99</li>
        <li>商品100</li>
      </ul>
    </div>
  </div>
</template>

<script>
// 引入better-scroll
import BScroll from "better-scroll";
export default {
  name: "appstore",
  data(){
      return {
          scroll:null
      }
  },
  // better-scroll实现不要写在create()函数里面,否则这里挂载不到模板,会使得bette-scroll失效！！！【请深入理解Vue的生命周期函数！】
  mounted(){
    // AIMS:①用better-scroll实现到达一定位置显示回到顶部的按钮，②制作上拉加载更多数据功能
      //默认情况下，better-scroll不能做到实时监听位置，需要在构造函数中传参指定
      const bscroll = new BScroll(document.querySelector('.scroll'),{//构造时必须有一个设定了height的用于滚动的父元素，且父元素下只能有一个子元素。
        // probeType:侦测。默认值为0。
          // 值为0：不侦测
          // 值为1：不侦测
          // 值为2：在手指滚动的过程中侦测，一旦手离开后惯性滚动不侦测。
          // 值为3：只要是滚动均侦测，不管是不是惯性滚动。
        probeType: 2,
        // click：点击事件传递。默认为false。
          //当better-scroll中管理的元素有点击事件时，如果click为false，则这些事件是会被better-scroll阻止从而不能被监听到的。为true则可以接触这个限制。【最新的好像已经取消这个限制了！】
        click:true,
        //pullUpLoad：上拉加载。为true表示支持上拉加载更多功能。
        pullUpLoad:true,
      })
      // better-scroll_object.on(param1,param2):param1表示监听事件类型，名字不能随便写，可参考官网。param2是一个函数，当BScroll对象监听到对应事件时执行param2对应的函数。
        //监听滚动事件，后面函数默认传入position参数
      bscroll.on('scroll', (position)=>{
        // console.log(position);
      })
        //监听上拉加载更多事件。
      bscroll.on('pullingUp',()=>{
        console.log("上拉加载更多...");
        //step1:发送网络请求，请求更多数据
        //step2:展示数据完成
        //step3:告诉bscroll此次上拉加载已经完成，可以进行下一次上拉加载
        bscroll.finishPullUp();//告诉bscroll此次上拉加载已经完成，可以进行下一次上拉加载。如果此处不调用这个方法，那么上拉加载只会被触发一次！！！

      })
  },
};
</script>

<style>
.scroll {
  height: 200px;
  background-color: pink;

  /* 这个overflow-y结合height属性可以实现局部滚动，但是这种原生实现在移动端非常卡顿 */
  /* overflow-y: scroll; */
  overflow: hidden;
}
</style>