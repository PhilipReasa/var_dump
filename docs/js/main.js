
function toggleCollapse() {
	"use strict";
	var collapser = $(this);

	if (collapser.hasClass("closed")) { //if it is closed
		collapser.siblings("ul").children("li").removeClass('hide');
		collapser.removeClass("closed");
	} else { //if it is open
		collapse(collapser); // collapse this element

		collapseAllChildren(collapser.siblings("ul"));
	}
}

function collapse($element) {
	$element.siblings("ul").children("li").addClass('hide');
	$element.addClass("closed");
}

function collapseAllChildren($start) {
	var all = $start.find(".openClose .openCloseIcon"), //get all collapsers ...
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
	collapseAllChildren($("#var_dump"));
}

$(function() {
	var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

	if(!is_chrome) {
		$("#notChrome").modal('show');
	}
	
	$("#showVarDump").click(function() {
		$(".var_dump_modal").show();
	});

	//bind all js to the modal
	$('.openClose .openCloseIcon').bind('click', toggleCollapse);
	$('#expandAll').bind('click', openAll);
	$('#collapseAll').bind('click', closeAll);
	$('.closeModal').bind('click', function() {
		$(".var_dump_modal").hide();
	});
});