const CONTEXT_MENU_ID = "var_dump_here";
const ACTION_DISPLAY_VAR_DUMP = "displayVarDump";
const ACTION_GET_ALL_OPTIONS = "getAllOptions";
const ACTION_OPEN_OPTIONS_PAGE = "openOptionsPage";

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
    chrome.tabs.sendMessage(tab.id, { action: ACTION_DISPLAY_VAR_DUMP });
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

    async function coerceToBoolean(keyName, val) {
      const coercedVal =
        val === undefined || val === null || val === "true" || !!val;

      return new Promise((resolve, _reject) => {
        chrome.storage.local.set({ [keyName]: coercedVal }, (newData) => {
          return resolve(newData[keyName]);
        });
      });
    }

    switch (request.action) {
      case ACTION_GET_ALL_OPTIONS:
        const colors = await getColors();

        const autoRunConfig = await coerceToBoolean(
          "autorun",
          await getRawValueFromLocalStorage("autorun"),
        );

        const cascadeConfig = await coerceToBoolean(
          "cascade",
          await getRawValueFromLocalStorage("cascade"),
        );

        sendResponse({
          colors: colors,
          autorun: autoRunConfig,
          cascade: cascadeConfig,
        });
        break;
      case ACTION_OPEN_OPTIONS_PAGE:
        chrome.runtime.openOptionsPage();
        break;
    }
  })();

  return true;
});
