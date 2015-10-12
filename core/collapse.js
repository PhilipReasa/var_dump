/*JSHINT info*/
/* exported openAll, closeAll*/
 
function toggleCollapse() {
	"use strict";
	var collapser = $(this);

	if (collapser.hasClass("closed")) { //if it is closed
		collapser.siblings("ul").children("li").removeClass('hide');
		collapser.removeClass("closed");
	} else { //if it is open
		collapse(collapser)
	}
}

function collapse($element) {
	$element.siblings("ul").children("li").addClass('hide');
	$element.addClass("closed");
}

function openAll() {
	"use strict";
	$("#var_dump").find('*').removeClass('hide'); //remove the hide class from everything
	$("#var_dump").find('*').removeClass('closed'); // <-- could be way more efficient
}

function closeAll() {
	"use strict";
	var all = $(".OpenClose .openCloseIcon"), //get all collapsers ...
		i = 0;
	while (i < all.length) { //... and close them
		collapse($(all[i]));
		i++;
	}
}