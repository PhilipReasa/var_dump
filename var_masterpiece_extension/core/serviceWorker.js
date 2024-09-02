/**
 * This little snippet adds a "var_dump here" element to the context menu (drop down created
 * with a right click).
 */
chrome.contextMenus.create({
  id: "var_dump_here",
  title: "var_dump here",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log(info, tab);
  if (info.menuItemId === "var_dump_here") {
    chrome.tabs.sendMessage(tab.id, { action: "displayVarDump" });
  }
});

/**
 * This code handles interacting with the local storage to fetch and return information such as
 * color values, autorun configuration, and the cascade configuration
 *
 * Example use: chrome.extension.sendRequest({action: "getAllOptions"}
 */
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  function getFromLocalStorage(localStorageName) {
    if (
      chrome.storage.local[localStorageName] === undefined ||
      chrome.storage.local[localStorageName] === "default"
    ) {
      return null;
    } else {
      return chrome.storage.local[localStorageName];
    }
  }

  function getColors() {
    const colors = {};
    colors.int = getFromLocalStorage("intColor");
    colors.float = getFromLocalStorage("floatColor");
    colors.string = getFromLocalStorage("stringColor");
    colors.null = getFromLocalStorage("nullColor");
    colors.array = getFromLocalStorage("arrayColor");
    colors.object = getFromLocalStorage("objectColor");
    colors.bool = getFromLocalStorage("boolColor");
    return colors;
  }

  if (request.action === "getAllOptions") {
    const colors = getColors();

    if (chrome.storage.local.autorun === undefined) {
      chrome.storage.local.autorun = "true"; // local storage only accepts strings
    }

    sendResponse({
      colors: colors,
      autorun: chrome.storage.local.autorun,
      cascade: chrome.storage.local.cascade,
    });
  }

  if (request.action === "openOptionsPage") {
    chrome.runtime.openOptionsPage();
  }
});
