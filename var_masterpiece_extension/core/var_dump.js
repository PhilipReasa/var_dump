/* JSHINT configuration (tell it about function in other files) */
/* globals collapse, openAll, closeAll, generateTheTree*/
/* globals chrome, SPECIAL_CLASS, DEBUG_PRINTJSON, AUTORUN, COLORS*/

/********************** 
* ALL HELPER FUNCTIONS:
***********************/ 

/**
* Returns string of a var_dump. if no vardumps found, returns false
*
* Currently takes the niave approach at looking for a var dump right at
* the begining of the page, and nowhere else. Only looks for arrays and objects
* 
* returns string if var dump found, false otherwise
*/
function whatShoudWeBeautify() {
	"use strict";
	var toReturn = $("body").html().trim();
	if(toReturn.substring(0,6) === "object") {
		return toReturn;
	}
	
	if(toReturn.substring(0,5) === "array") {
		return toReturn;
	}
	
	return false;
}

/*
* events for the "open" and "close" buttons in the var dump
*
* collapse, openAll, and closeAll functions are saved ni collapse.js
*/
function addListners() {
	"use strict";
	$('.openClose .openCloseIcon').bind('click', toggleCollapse);
	$('#expandAll').bind('click', openAll);
	$('#collapseAll').bind('click', closeAll);
	$('.closeModal').bind('click', function() {
		$(".VAR_DUMP-DEADBEEF").remove();
	});
}

function openVarDump() {
	"use strict";
	return "<div class='"+SPECIAL_CLASS+"'>"
}

function closeVarDump() {
	"use strict"
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
		  		"<div id='expandAll'><img class='svgIcon' src='" + chrome.extension.getURL("images/chevron-sign-down.svg") + "'> Expand All </div>" +
				"<div id='collapseAll'><img class='svgIcon rotate180' src='" + chrome.extension.getURL("images/chevron-sign-down.svg") + "'> Collapse All </div>" +
				"<div class='closeModal'><img class='svgIcon' src='" + chrome.extension.getURL("images/cross-mark-on-a-black-circle-background.svg") + "'></div>" +
			"</div>";
}

function getColorVal(color) {
	"use strict";
	if(color === undefined) {
		return "inherit";
	} else {
		return color;
	}
}

function generateInlineStyles() {
	"use strict";
	return '' +
		'<style class="VAR_DUMP-DEADBEEF" type="text/css">' +
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

	//If we think that the whole page is a var dump
	if(dump) {	
		printModalTree(dump);
	}
}

/****************
* CONTEXT MENU STUFF
*****************/
/**
* Function to grab the slected text from the user.
* A little more complex than normal, because we need to
* preserve the \n's that we see. They are important for
* parsing the var dump, and chrome has a bug that kills them
* //http://stackoverflow.com/a/5670825
*/
function getSelectionHtml() { 
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

/**
* Given var dump text, this will create a modal with the var dump
* tree inside.
*/
function printModalTree(dump) {
	"use strict";

	dump = dump.trim();

	var varDumpObject;
	try {
		varDumpObject = parseVarDump(dump);
	} catch(e) {
		console.log(dump);
		console.log(e);
		return;
	}

	//generate our html
	var modalOpen = openModalHTML();
	var header = headerHTML();
	var modalClose = closeModalHTML();

	//add out html / styles / listeners to the page
	$('body').append(generateInlineStyles());
	$('body').append(modalOpen + header + printVarDump(varDumpObject) + modalClose);
	addListners();
}

chrome.extension.onMessage.addListener(function (message) {
	"use strict";
    if (message.fn === "printTree") { //sent from context menu
		printModalTree(getSelectionHtml());
    }
});