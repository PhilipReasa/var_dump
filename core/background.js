/*JSHINT info*/
/* globals chrome*/
/*jshint sub:true*/ //<-- we have JS reserved words as keys intentionally. This prevent warnings due to that

/*
* Aux Functions 
*/
function getFromLocalStorage(localStorageName) {
	if((localStorage[localStorageName] === undefined)||(localStorage[localStorageName] === "default")) {
		return null;
	} else {
		return localStorage[localStorageName];
	}
}

function getColors() {
	var colors = {};
	colors["int"] 	= getFromLocalStorage("intColor");
	colors["float"] = getFromLocalStorage("floatColor");
	colors["string"]= getFromLocalStorage("stringColor");
	colors["null"] 	= getFromLocalStorage("nullColor");
	colors["array"] = getFromLocalStorage("arrayColor");
	colors["object"]= getFromLocalStorage("objectColor");
	colors["bool"] 	= getFromLocalStorage("boolColor");
	return colors;
}

/*
* The main code
*/
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.method === "getAllOptions") {
	  colors = getColors();

	  if(localStorage.autorun === undefined) {
		localStorage.autorun = "true"; //local storage only accepts strings
	  }

	  sendResponse({colors: colors, autorun:localStorage.autorun, cascade:localStorage.cascade});
    }
});