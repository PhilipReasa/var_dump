/**
* Returns string of a var_dump. if no vardumps found, returns false
*/
function whatShoudWeBeautify() {
	"use strict";
	var toReturn = $("body").html();
	if(toReturn.substring(0,4) == "object".substring(0,4)) {
		return splitDump(toReturn);
	}
	
	if(toReturn.substring(0,4) == "array".substring(0,4)) {
		return splitDump(toReturn);
	}
	
	return false;
}

function removeTheDump() {
	"use strict";
	$("body").empty();
}

function splitDump(dump) {
	"use strict";
	return dump.split("\n");
}

function addListners() {
	"use strict";
	$('.OpenClose').bind('click', collapse);
	$('.openall').bind('click', openAll);
	$('.closeall').bind('click', closeAll);
	$('.close').bind('click', function() {
		$(".modal").remove();
	});
}

function bootstrap_vardump() {
	"use strict"
	var dump = whatShoudWeBeautify(); 

	if(dump) {
		removeTheDump();
	
		var tree = generateTheTree(dump);
		$('body').append(tree.print());
	
		if(DEBUG_PRINTJSON) {
			$('body').append(JSON.stringify(tree));
		}
	}

	addListners();
}

chrome.extension.sendRequest({method: "getColors"}, function(response) {
	COLORS = response.data;
	bootstrap_vardump();
});

//CONTEXT MENUS STUFF
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
            for (i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
}

function printModalTree(dump) {
	dump = getSelectionHtml();
	var modalOpen = "<div class='DEADBEEF'><div class='modal'><div class='close'>Close</div>";
	var modalClose = "</div></div>";
	dump = splitDump(dump);
	var tree =  generateTheTree(dump);
	$('body').append(modalOpen + tree.print() + modalClose);
	
	addListners();
}

chrome.extension.onMessage.addListener(function (message, sender, callback) {
	"use strict";
    if (message.fn == "printTree") {
		printModalTree(message.dump);
    }
});