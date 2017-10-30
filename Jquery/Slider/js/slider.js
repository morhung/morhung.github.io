var INDEX = 1;
var RUNAUTO;
var IMG = $(".image-slider");
var INDEX_IMG = $(".index-img");


$(document).ready(function() {
   showImage();
});

//loop show image after 2s.
function showImage() {
	if (INDEX > 4) {
		INDEX = 0;
	}

	if (INDEX < 0) {
		INDEX = 4;
	}

	IMG.hide(); //hide all image in slide
	IMG.eq(INDEX).show(); // show image had index = INDEX
	effectImageIndex(); //effect for index image.
	clearTimeout(RUNAUTO);
	RUNAUTO = setTimeout(function() {
		INDEX++;
		console.log(INDEX);
		showImage();
	}, 2000);
}

//effect for image index.
function effectImageIndex() {
	INDEX_IMG.removeClass("color_bg");
	INDEX_IMG.eq(INDEX).addClass("color_bg");
}

//event when click button pre
$(".pre").click(function() {
	INDEX--;
	console.log("pre: ",INDEX);
	showImage();
});

//event when click button next
$(".next").click(function() {
	INDEX++;
	console.log("next: ",INDEX);
	showImage();
});

//event when click image index (the ball).
$(".index-img").click(function() {
	INDEX = INDEX_IMG.index(this);
	console.log("click index:", INDEX);
	showImage();
});
