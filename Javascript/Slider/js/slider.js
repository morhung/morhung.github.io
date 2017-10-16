var indexImg = 0;
var img = document.getElementsByClassName("image-slider");
var img_index = document.getElementsByClassName("index-img");

showImage(indexImg);

function showImage(id) {
	let i, totalImg;
	totalImg = img.length;

	if (id > totalImg - 1) {
		indexImg = 0;
	}
	if (id < 0) {
		indexImg = totalImg - 1;
	}

	//Set all img
	for (i = 0; i < totalImg; i++) {	
		img[i].style.display = "none"; //set display: none for all element img slider
		img_index[i].className = "index-img"; //set className for all element img index
	}
	img[indexImg].style.display = "block";
	img_index[indexImg].className += " color_bg"; //add color_bg class to element img index.
	setTimeout(function() {
		showImage(indexImg += 1);
	}, 1000);
}

/*event change image when click pre or next*/
function changeImg(id) {
	showImage(indexImg += id);
}

/*event change image when click index image*/
function indexClick(id) {
	showImage(indexImg = id);
}