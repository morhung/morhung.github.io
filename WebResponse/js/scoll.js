$(function() {
	var btnTop = $("#page-top");

	btnTop.hide();

	$(window).scroll(function() {
		if ($(this).scrollTop() > 100) {
            btnTop.fadeIn();
        } else {
            btnTop.fadeOut();
        }
	});
    
    btnTop.click(function() {
        $('body, html').animate({
            scrollTop: 0
        }, 500);
        return false;
    })
});