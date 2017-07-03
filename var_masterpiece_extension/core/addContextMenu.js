/**
 * This little snippet adds a "var_dump here" element to the context menu (drop down created
 * with a right click).
 */

chrome.contextMenus.create({
    "title": "var_dump here",
    "contexts": ["selection"],
    "onclick": () => {
        chrome.tabs.query({ //get current tab
            "active": true,
            "currentWindow": true
        }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {"action": "displayVarDump"});
        });
    }
});