window.onload = function(){
	var index = 0;
	var imgArr = ["img/KWONJIYONG-PHOTO-013.jpg" , "img/KWONJIYONG-PHOTO-014.jpg" , "img/KWONJIYONG-PHOTO-015.jpg"];
	//点击prev和next按钮 前后切换
	document.getElementsByClassName("prev")[0].onclick = function(){
		index--;
		currentSlides();
	}
	document.getElementsByClassName("next")[0].onclick = function(){
		index++;
		currentSlides();
	}
	
	//检查Index
	function checkIndex(){
		if(index < 0)	index = imgArr.length-1;
		else	index %= imgArr.length;
	}
	//为每个导航按钮添加属性ind
	
	var ancList = document.getElementsByClassName("pageDot");
	for(let i=0; i<ancList.length; i++){
		ancList[i].ind = i;
	}	
	
	document.getElementById("pageChange").addEventListener("click", function(e){
		var e = e || window.event;
		var target = e.target || e.srcElement;
		index = target.ind;
		currentSlides();
	});
	
	
	
	//点击导航按钮切换
	function currentSlides(){
		// 获取img对象
		var img = document.getElementsByTagName('img')[0];
		checkIndex();
		
		navChange();
		// 切换图片
		img.src = imgArr[index];
		clearInterval(timeInterval);
		autoChange();
	}

	//设置导航栏变换
	function navChange(){
		for(let i=0; i < ancList.length; i++){
			ancList[i].style.backgroundColor = 'black';
		}
		ancList[index].style.backgroundColor = '#A9A9A9';
	}

	document.getElementsByTagName('img')[0].src = imgArr[index];
	document.getElementsByClassName("pageDot")[0].style.backgroundColor = '#A9A9A9';
	autoChange();
	
	var timeInterval;
	//设置自动轮换
	function autoChange(){
		timeInterval = setInterval(function(){
			index++;
			currentSlides();
		}, 3000);
	}
};

