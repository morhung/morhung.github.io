var INDEX = 0;
var RUNAUTO;
var IMG = document.getElementsByClassName("image-slider");
var INDEX_IMG = document.getElementsByClassName("index-img");

showImage(INDEX);

function showImage(id) {
	let i, totalIMG;
	totalIMG = IMG.length;

	if (id > totalIMG - 1) {
		INDEX = 0;
	}
	if (id < 0) {
		INDEX = totalIMG - 1;
	}

	//Set all IMG
	for (i = 0; i < totalIMG; i++) {	
		IMG[i].style.display = "none"; //set display: none for all element IMG slider
		INDEX_IMG[i].className = "index-img"; //set className for all element IMG index
	}
	IMG[INDEX].style.display = "block";
	INDEX_IMG[INDEX].className += " color_bg"; //add color_bg class to element IMG index.
	clearTimeout(RUNAUTO);
	RUNAUTO = setTimeout(function() {
		showImage(INDEX += 1);
	}, 1000);
}

/*event change image when click pre or next*/
function changeIMG(id) {
	showImage(INDEX += id);
}

/*event change image when click index image*/
function indexClick(id) {
	showImage(INDEX = id);
}