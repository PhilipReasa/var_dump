var contexts=["selection"];

function varDumpIt(info, tabs) {
	var dump = info.selectionText;
	chrome.tabs.query({
		"active": true,
        "currentWindow": true
	}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {
			"fn":"printTree",
			"dump":dump
		});
	});
}

chrome.contextMenus.create({"title": "var_dump here", "contexts":[contexts[0]], "onclick":varDumpIt});