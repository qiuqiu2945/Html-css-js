var pageNum = 1;
showSlides(pageNum);



//添加自动播放功能
function showSlides(num) {
  var slides = document.getElementsByClassName("slides-show");
	var dots = document.getElementsByClassName("pageDot");
	if( num < 1 )	pageNum = slides.length;
	if( num > slides.length )	pageNum = 1;
	var i;
	for(i = 0; i < slides.length; i++){
		slides[i].style.display = "none";
	}
	for(i = 0; i < dots.length; i++){
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[pageNum-1].style.display = "block";
	dots[pageNum-1].className += " active";
}

function slidesChange(num){
	pageNum += num;
	showSlides(pageNum);
}

function currentSlides(num){
	pageNum = num;
	showSlides(pageNum);
}