/*JSHINT info*/
/* exported openAll, closeAll*/
 
function collapse(evt) {
	"use strict";
	var collapser = $(this); //the dom element that was clicked
	if (collapser.hasClass("selected")) { //if it is open
		collapser.children("li").removeClass('hide');
	} else { //closed case
		collapser.children("li").addClass('hide');
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