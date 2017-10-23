var INDEX_IMG = 0;
var RUNAUTO;
var IMG = document.getElementsByClassName("image-slider");
var IMG_INDEX = document.getElementsByClassName("index-img");

showImage(INDEX_IMG);

function showImage(id) {
	let i, totalIMG;
	totalIMG = IMG.length;

	if (id > totalIMG - 1) {
		INDEX_IMG = 0;
	}
	if (id < 0) {
		INDEX_IMG = totalIMG - 1;
	}

	//Set all IMG
	for (i = 0; i < totalIMG; i++) {	
		IMG[i].style.display = "none"; //set display: none for all element IMG slider
		IMG_INDEX[i].className = "index-img"; //set className for all element IMG index
	}
	IMG[INDEX_IMG].style.display = "block";
	IMG_INDEX[INDEX_IMG].className += " color_bg"; //add color_bg class to element IMG index.
	clearTimeout(RUNAUTO);
	RUNAUTO = setTimeout(function() {
		showImage(INDEX_IMG += 1);
	}, 1000);
}

/*event change image when click pre or next*/
function changeIMG(id) {
	showImage(INDEX_IMG += id);
}

/*event change image when click index image*/
function indexClick(id) {
	showImage(INDEX_IMG = id);
}