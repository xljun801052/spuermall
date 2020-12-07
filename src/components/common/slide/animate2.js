// 这个函数需要封装一下：让元素以动画形式移动到指定目标处(限X轴位置)
	export function move(ele,target){
		//先清除上一个定时器
		// clearInterval(ele.moveId)
		moveId = setInterval(
			function (){
				// 这个地方设置步长会使得动画具有先快后慢的特效，可以思考一下这个函数！
				step = ((target - ele.offsetLeft)/10)>0?Math.ceil(((target - ele.offsetLeft)/10)):Math.floor(((target - ele.offsetLeft)/10))
				ele.style.left = ele.offsetLeft + step + 'px'
				current_position = ele.offsetLeft
				if (current_position == target) {
					clearInterval(moveId)
				}
			},16)
	}