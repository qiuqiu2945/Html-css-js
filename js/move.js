/*
	创建一个move动画函数, 完成一个简单的移动动画
	obj:对象
	attr:属性
	tPos:目标位置
	speed:移动速度
	callback:动画执行完后,执行这个回调函数
*/
function move(obj, attr, tPos, speed, callback){
	// 停止原来的计时器
	clearInterval(obj.timer);
	// 元素当前位置
	var curPos = parseInt(getComputedStyle(obj,null)[attr] || obj.currentStyle[attr]);
	//判断speed应为正还是负,如果是正向移动则为正,反向移动则为负
	speed = curPos > tPos ? -speed : speed;

	//移动函数
	obj.timer = setInterval(function(){
		//获取目前位置
		var oldPos = parseInt(getComputedStyle(obj,null)[attr] || obj.currentStyle[attr]);
		//更新位置
		var newPos = oldPos + speed;
		obj.style[attr] = newPos + "px";
		//检查是否到达指定位置
		if(newPos == tPos){
			//关闭定时器
			clearInterval(obj.timer);
			//回调函数
			callback && callback();
		}
		
		
	}, 30);
	
	
}