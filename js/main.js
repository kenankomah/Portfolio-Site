$(document).ready(function(){
	//this code is used display the menu on smaller screens
    $(".nav-trigger").click(function(){
        $(".nav").toggleClass("nav-open");
		event.preventDefault(); //prevents the menu icon from being treated like a link so that the menu can be displayed
	});

	//https://css-tricks.com/snippets/jquery/smooth-scrolling/
	$(function(){
		$('a[href*="#"]:not([href="#"])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html, body').animate({
					scrollTop: target.offset().top - 30
				}, 1000);
					return false;
				}
			}
		});
	});
});


 
