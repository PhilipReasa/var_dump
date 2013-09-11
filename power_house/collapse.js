function collapse(evt) {
	"use strict";
	var collapser; //the dom element that was clicked
	if (evt.target == undefined) {
		collapser = evt; //for closeAll fn
	} else {
		collapser = evt.target;
	}
	if (collapser.innerHTML == "- ") { //if it is open
		$(collapser).siblings("ul").children("li").addClass('hide');
		collapser.innerHTML = '+ ';
	} else { //closed case
		$(collapser).siblings("ul").children("li").removeClass('hide');
		collapser.innerHTML = '- ';
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