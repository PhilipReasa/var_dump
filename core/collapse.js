/*JSHINT info*/
/* globals CASCADE*/
/* exported openAll, closeAll*/
 
function toggleCollapse() {
	"use strict";
	var collapser = $(this);

	if (collapser.hasClass("closed")) { //if it is closed
		collapser.siblings("ul").children("li").removeClass('hide');
		collapser.removeClass("closed");
	} else { //if it is open
		collapse(collapser) // collapse this element

		if(CASCADE === "true") { //if we want to cascade down, collapse the other elements as well
			collapseAllChildren(collapser.siblings("ul"))
		}
	}
}

function collapse($element) {
	$element.siblings("ul").children("li").addClass('hide');
	$element.addClass("closed");
}

function collapseAllChildren($start) {
	var all = $start.find(".OpenClose .openCloseIcon"), //get all collapsers ...
		i = 0;
	while (i < all.length) { //... and close them
		collapse($(all[i]));
		i++;
	}
}

function openAll() {
	"use strict";
	$("#var_dump").find('*').removeClass('hide'); //remove the hide class from everything
	$("#var_dump").find('*').removeClass('closed'); // <-- could be way more efficient
}

function closeAll() {
	"use strict";
	collapseAllChildren($("#var_dump"))
}
