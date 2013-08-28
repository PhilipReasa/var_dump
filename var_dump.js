/**
* Returns string of a var_dump. if no vardumps found, returns false
*/
function whatShoudWeBeautify() {
	var toReturn = $("body").html();
	if(toReturn.substring(0,4) == "object".substring(0,4)) {
		return splitDump(toReturn);
	}
	
	if(toReturn.substring(0,4) == "array".substring(0,4)) {
		return splitDump(toReturn);
	}
	
	return false
}

function removeTheDump() {
	$("body").empty()
}

function splitDump(dump) {
	return dump.split("\n");
}

function addListners() {
	$('.OpenClose').bind('click', collapse);
	$('.openall').bind('click', openAll);
	$('.closeall').bind('click', closeAll);
	$('.close').bind('click', function() {
		$(".modal").remove();
	});
}

var dump = whatShoudWeBeautify() 

if(dump) {
	removeTheDump();
	
	var tree = generateTheTree(dump);
	$('body').append(tree.print());
	
	if(DEBUG_PRINTJSON) {
		$('body').append(JSON.stringify(tree))
	}
}

addListners();


//CONTEXT MENUS STUFF

chrome.extension.onMessage.addListener(function (message, sender, callback) {
    if (message.fn == "printTree") {
		printModalTree(message.dump);
    }
});

function printModalTree(dump) {
	dump = getSelectionHtml();
	var modalOpen = "<div class='DEADBEEF'><div class='modal'><div class='close'>Close</div>";
	var modalClose = "</div></div>";
	dump = splitDump(dump);
	var tree =  generateTheTree(dump);
	$('body').append(modalOpen + tree.print() + modalClose)
	
	addListners();
}

function getSelectionHtml() { //http://stackoverflow.com/a/5670825
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
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