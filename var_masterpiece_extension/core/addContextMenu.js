/*JSHINT info*/
/* globals chrome*/ 

var contexts = ["selection"]; 

function varDumpIt(info, tabs) {
	"use strict";
	var dump = info.selectionText; //cannot use this because chrome strips out the \n's
	chrome.tabs.query({ //get current tab
		"active": true,
        "currentWindow": true
	}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {
			"fn": "printTree",
			"dump": dump //passing it incase chrome ever does keep the \n's
		});
	});
}

chrome.contextMenus.create({"title": "var_dump here", "contexts": [contexts[0]], "onclick": varDumpIt});