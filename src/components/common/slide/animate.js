/* 
  动画函数：让任意元素移动任意距离
            element     target
  */
export function animate(element,target) {

  // 在开启定时器之前，需要清除上一个定时器
  clearInterval(element.timeId);
  
  element.timeId = setInterval(function () {

    // 通过offsetLeft获取的数据会四舍五入
    var current = element.offsetLeft;

    // 可以把每一步的距离——》用变量表示
    var step = ( target - current ) / 10;
    // 1、如果需要走0.4，应该向上取整得到1px即可
    // 2、如果需要走-0.9，应该向下取整得到-1即可
    // step = Math.ceil(step);
    step = step > 0 ? Math.ceil(step) : Math.floor(step);

    // console.log( current,step );

    current += step;
    element.style.left = current + 'px';

    // 如果当前的位置current === target ——》要停——》清除定时器
    if ( current === target ) {
      clearInterval(element.timeId);
    }
  },16)

}