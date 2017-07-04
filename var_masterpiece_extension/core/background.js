/**
 * This file handles interacting with the local storage to fetch and return information such as
 * color values, autorun configuration, and the cascade configuration
 *
 * Example use: chrome.extension.sendRequest({action: "getAllOptions"}
 */
chrome.extension.onRequest.addListener((request, sender, sendResponse) => {
    function getFromLocalStorage(localStorageName) {
        if ((localStorage[localStorageName] === undefined) || (localStorage[localStorageName] === 'default')) {
            return null;
        } else {
            return localStorage[localStorageName];
        }
    }

    function getColors() {
        const colors = {};
        colors.int = getFromLocalStorage('intColor');
        colors.float = getFromLocalStorage('floatColor');
        colors.string = getFromLocalStorage('stringColor');
        colors.null = getFromLocalStorage('nullColor');
        colors.array = getFromLocalStorage('arrayColor');
        colors.object = getFromLocalStorage('objectColor');
        colors.bool = getFromLocalStorage('boolColor');
        return colors;
    }

    if (request.action === 'getAllOptions') {
        const colors = getColors();

        if (localStorage.autorun === undefined) {
            localStorage.autorun = 'true'; // local storage only accepts strings
        }

        sendResponse({
            colors: colors,
            autorun: localStorage.autorun,
            cascade: localStorage.cascade
        });
    }

    if (request.action === 'openOptionsPage') {
        chrome.runtime.openOptionsPage();
    }
})
