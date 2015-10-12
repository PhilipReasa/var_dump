/* JSHINT configuration (tell it about function in other files) */
/* globals collapse, openAll, closeAll, generateTheTree*/
/* globals chrome, SPECIAL_CLASS, DEBUG_PRINTJSON, AUTORUN, COLORS*/

/********************** 
* ALL HELPER FUNCTIONS:
***********************/ 
/*
* Takes the output of a vardump and splits it at each line
*/
function splitDump(dump) {
	"use strict"; 
	return dump.split("\n");
}

/**
* Returns string of a var_dump. if no vardumps found, returns false
*
* Currently takes the niave approach at looking for a var dump right at
* the begining of the page, and nowhere else.
*/
function whatShoudWeBeautify() {
	"use strict";
	var toReturn = $("body").html();
	if(toReturn.substring(0,4) === "object".substring(0,4)) {
		return splitDump(toReturn);
	}
	
	if(toReturn.substring(0,4) === "array".substring(0,4)) {
		return splitDump(toReturn);
	}
	
	return false;
}

/*
* This function just deletes the whole body...should only be used when the first thing detected was a var dump
*/
function removeTheDump() {
	"use strict";
	$("body").empty();
}

/*
* events for the "open" and "close" buttons in the var dump
*
* collapse, openAll, and closeAll functions are saved ni collapse.js
*/
function addListners() {
	"use strict";
	$('.OpenClose .openCloseIcon').bind('click', toggleCollapse);
	$('#expandAll').bind('click', openAll);
	$('#collapseAll').bind('click', closeAll);
	$('.closeModal').bind('click', function() {
		$(".var_dump_modal").remove();
	});
}

function openVarDump() {
	"use strict";
	return "<div class='"+SPECIAL_CLASS+"'>"
}

function closeVarDump() {
	return "</div>";
}

function openModalHTML() {
	"use strict";
	return openVarDump() + "<div class='var_dump_modal'>";
}

function closeModalHTML() {
	"use strict";
	return "</div>" + closeVarDump();
}

function headerHTML() {
	"use strict";
	return "<div id='header'>" +
		  		"<div id='expandAll'><i class='fa fa-chevron-circle-down'></i> Expand All </div>" +
				"<div id='collapseAll'><i class='fa fa-chevron-circle-up'></i> Collapse All </div>" +
				"<div class='closeModal'><i class='fa fa-close'></i></div>" +
			"</div>";
}

function getColorVal(color) {
	if(color === undefined) {
		return "inherit";
	} else {
		return color;
	}
}

function generateInlineStyles() {
	return '' +
		'<style type="text/css">' +
			'.VAR_DUMP-DEADBEEF #var_dump .bool 	{ color:' + getColorVal(COLORS["bool"]) + 	'; } \n' +
			'.VAR_DUMP-DEADBEEF #var_dump .int 	{ color:' + getColorVal(COLORS["int"]) + 	'; } \n' +
			'.VAR_DUMP-DEADBEEF #var_dump .float { color:' + getColorVal(COLORS["float"]) + 	'; } \n' +
			'.VAR_DUMP-DEADBEEF #var_dump .null 	{ color:' + getColorVal(COLORS["null"]) + 	'; } \n' +
			'.VAR_DUMP-DEADBEEF #var_dump .array { color:' + getColorVal(COLORS["array"]) + 	'; } \n' +
			'.VAR_DUMP-DEADBEEF #var_dump .object { color:' + getColorVal(COLORS["object"]) + '; } \n' +
			'.VAR_DUMP-DEADBEEF #var_dump .string { color:' + getColorVal(COLORS["string"]) + '; } \n' +
		'</style>'
}

/****************
* MAIN STUFF
*****************/
function bootstrap_vardump() {
	"use strict";
	var dump = whatShoudWeBeautify(); 

	/*If we think that the whole page is a var dump*/
	if(dump) {
		removeTheDump();
	
		var tree = generateTheTree(dump);

		$('body').append(generateInlineStyles());

		$('body').append(openVarDump() + tree.print() + closeVarDump());

		addListners();
	}
}

/****************
* CONTEXT MENU STUFF
*****************/
function getSelectionHtml() { //http://stackoverflow.com/a/5670825
	"use strict";
    var html = "",
		sel,
		container,
		i = 0;
    if (window.getSelection !== "undefined") {
		sel = window.getSelection();
        if (sel.rangeCount) {
            container = document.createElement("div");
			var len = sel.rangeCount;
            for (i = 0; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection !== "undefined") {
        if (document.selection.type === "Text") { 
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
}

function printModalTree(dump) {
	"use strict";
	dump = getSelectionHtml();
	var modalOpen = openModalHTML();
	var header = headerHTML();
	var modalClose = closeModalHTML();
	dump = splitDump(dump);
	var tree =  generateTheTree(dump);
	$('body').append(generateInlineStyles());
	$('body').append(modalOpen + header + tree.print() + modalClose);
	
	addListners();
}

chrome.extension.onMessage.addListener(function (message) {
	"use strict";
    if (message.fn === "printTree") { //sent from context menu
		printModalTree(message.dump);
    }
});