function triggerVarDump(info, tabs) {
	/*
	 * Chrome Strips out '\n' from selection text, so although using into.selectionText would be ideal,
	 * it wont currently work. If this chrome bug is fixed we can the following simplified solution:
	 * BUG: https://bugs.chromium.org/p/chromium/issues/detail?id=116429
	 * SIMPLE SOLUTION: const dump = info.selectionText;
	 *
	 * For now, we are using a more complex solution in var_dump.js (getSelectionHtml)
	 */

	chrome.tabs.query({ //get current tab
		"active": true,
        "currentWindow": true
	}, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, {"fn": "printTree"});
	});
}

chrome.contextMenus.create({
    "title": "var_dump here",
    "contexts": ["selection"],
    "onclick": triggerVarDump
});