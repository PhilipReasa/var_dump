const CONTEXT_MENU_ID = "var_dump_here";

/**
 * This little snippet adds a "var_dump here" element to the context menu (drop down created
 * with a right click). Due to service worker shenanigans we have remove then add
 * to prevent adding the same menu multiple times
 */
chrome.contextMenus.removeAll(() => {
  chrome.contextMenus.create({
    id: CONTEXT_MENU_ID,
    title: "var_dump here",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === CONTEXT_MENU_ID) {
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
  (async () => {
    function getRawValueFromLocalStorage(keyName) {
      return new Promise((resolve, _reject) => {
        chrome.storage.local.get([keyName], (val) => {
          return resolve(val[keyName]);
        });
      });
    }

    async function getFromLocalStorage(localStorageName) {
      const val = await getRawValueFromLocalStorage(localStorageName);
      if (val === undefined || val === "default") {
        return null;
      } else {
        return val;
      }
    }

    async function getColors() {
      const colors = {};
      colors.int = await getFromLocalStorage("intColor");
      colors.float = await getFromLocalStorage("floatColor");
      colors.string = await getFromLocalStorage("stringColor");
      colors.null = await getFromLocalStorage("nullColor");
      colors.array = await getFromLocalStorage("arrayColor");
      colors.object = await getFromLocalStorage("objectColor");
      colors.bool = await getFromLocalStorage("boolColor");
      return colors;
    }

    if (request.action === "getAllOptions") {
      const colors = await getColors();

      const autoRunConfig = await getRawValueFromLocalStorage("autorun");
      if (autoRunConfig === undefined) {
        chrome.storage.local.set({ autorun: "true" });
      }

      sendResponse({
        colors: colors,
        autorun: await getRawValueFromLocalStorage("autorun"),
        cascade: await getRawValueFromLocalStorage("cascade"),
      });
    }

    if (request.action === "openOptionsPage") {
      chrome.runtime.openOptionsPage();
    }
  })();

  return true;
});
