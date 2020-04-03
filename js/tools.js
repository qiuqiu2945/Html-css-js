//尝试创建一个可以执行简单动画的函数
/* 元素移动函数  move
 * 参数：
 * 	obj:要执行动画的对象
 * 	attr:要执行动画的样式，比如：left top width height
 * 	target:执行动画的目标位置
 * 	speed:移动的速度(正数向右移动，负数向左移动)
 *  callback:回调函数，这个函数将会在动画执行完毕以后执行
 */
function move(obj, attr, target, speed, callback){
	//关闭上一个定时器
	clearInterval(obj.timer);
	
	//获取元素目前的位置
	var current = parseInt(getStyle(obj, attr));
	
	//判断速度的正负值
	//如果从0 向 800移动，则speed为正
	//如果从800向0移动，则speed为负
	if(current > target) {
		//此时速度应为负值
		speed = -speed;
	}
	
	//开启一个定时器，用来执行动画效果
	//向执行动画的对象中添加一个timer属性，用来保存它自己的定时器的标识
	obj.timer = setInterval(function() {
	
		//获取box1的原来的left值
		var oldValue = parseInt(getStyle(obj, attr));
	
		//在旧值的基础上增加
		var newValue = oldValue + speed;
	
		//判断newValue是否大于800
		//从800 向 0移动
		//向左移动时，需要判断newValue是否小于target
		//向右移动时，需要判断newValue是否大于target
		if((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
			newValue = target;
		}
	
		//将新值设置给box1
		obj.style[attr] = newValue + "px";
	
		//当元素移动到0px时，使其停止执行动画
		if(newValue == target) {
			//达到目标，关闭定时器
			clearInterval(obj.timer);
			//动画执行完毕，调用回调函数
			callback && callback();
		}
	
	}, 30);
}
/* 获取obj的指定样式值 */
function getStyle(obj, name) {

	if(window.getComputedStyle) {
		//正常浏览器的方式，具有getComputedStyle()方法
		return getComputedStyle(obj, null)[name];
	} else {
		//IE8的方式，没有getComputedStyle()方法
		return obj.currentStyle[name];
	}
}

/*
* 原生拖拽 函数
* obj : 开启拖拽事件的元素对象
*/
function drag(obj){
	/* 拖拽事件 */
	// 1.第一步为按下鼠标，不抬起。
	obj.onmousedown = function(e){
		//（IE8）用setCapture为box1强制捕获所有按下事件，然后再松开的时候取消强制捕获。
		//setCapture只有IE支持，火狐不报错，chrome报错。
		obj.setCapture && obj.setCapture();
		//求鼠标和元素的相对位置差值，鼠标点哪里就在哪里
		e = e || window.event;
		var offl = e.clientX - obj.offsetLeft;
		var offt = e.clientY - obj.offsetTop;
		//第二步为 对象跟随鼠标移动
		document.onmousemove = function(e){
			var e = e || window.event;
			//获取鼠标的坐标
			var left = e.clientX - offl;
			var top = e.clientY - offt;	//减掉鼠标点击时相对元素的坐标位置。
			//将鼠标的坐标值赋值给元素
			obj.style.left = left + "px";
			obj.style.top = top + "px";
		};
		//第三步为 对象固定到鼠标松开的位置
		//必须绑定给document，不然鼠标移动到box2上面时，up事件不会起作用。
		document.onmouseup = function(){
			//取消移动事件
			document.onmousemove = null;
			
			//给document绑定up事件就需要取消up事件，不然监听所有的点击
			document.onmouseup = null;
			
			//取消强制捕获事件
			obj.releaseCapture && obj.releaseCapture();
		};
		/*
		* 浏览器默认提供选中文字移动自动搜索的行为。
		* 但会使拖拽事件出错，拖拽也可能会搜索（按全选页面再拖拽时）
		* 使用return false来取消这个默认行为（IE8不可以）。
		* */
		return false;
	};
}

/* 绑定函数
obj : 绑定的对象
evenStr : 事件字符串
callback : 回调函数
*/
function bind(obj, eventStr, callback){
	/*
	两个方法的 this 不统一
	第一个 this 为 obj，事件调用函数指向事件对象
	attachEvent 的 this 为 window，因为是浏览器调用callback
	需要进行统一。
	this 由调用方式决定。
	*/
 if(obj.addEventListener){
		//一般浏览器
		obj.addEventListener(eventStr, callback, false);
 }else{
		// ie8以下
		obj.attachEvent("on"+eventStr, function(){
			//从匿名函数调用回调函数。
			//用 call 指定 this
			callback.call(obj);
		}); //callback);
 }
}

/* 
 *用来添加新类的函数。 
 */
function addClass(obj, cn){
	if(!hasClass(obj, cn)){/*先检查类是否存在*/
		obj.className = obj.className + " " + cn;
	}
}
/* 
 * 判断元素中是否有指定的类
 * 如果有，返回true，否则返回false
 */
function hasClass(obj, cn){
	var reg = new RegExp("\\b"+cn+"\\b");	/* /b 表示单词边界匹配*/
	return reg.test(obj.className);
}
/*
 * 移除class
 */
function removeClass(obj, cn){
	var reg = new RegExp("\\b"+cn+"\\b");
	obj.className = obj.className.replace(reg, "");
}
/* toggleClass
 * 切换class
 * 如果元素中有该类就删除
 * 否则就添加
 */
function toggleClass(obj, cn){
	if(hasClass(obj, cn)){
		removeClass(obj, cn);
	}else{
		addClass(obj, cn);
	}
}