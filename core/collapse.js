/*JSHINT info*/
/* exported openAll, closeAll*/
 
function collapse(evt) {
	"use strict";
	var collapser = $(this); //the dom element that was clicked
	if (collapser.hasClass("closed")) { //if it is open
		collapser.siblings("ul").children("li").removeClass('hide');
		collapser.removeClass("closed");
	} else { //closed case
		collapser.siblings("ul").children("li").addClass('hide');
		collapser.addClass("closed");
	}
}

function openAll() {
	"use strict";
	$("#var_dump").find('*').removeClass('hide'); //remove the hide class frome everything
	$(".OpenClose").html("- ");
}

function closeAll() {
	"use strict";
	var all = $(".OpenClose"), //get all collapsers ...
		i = 0;
	while (i < all.length) { //... and close them
		collapse(all[i]);
		i++;
	}
}