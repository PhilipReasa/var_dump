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
	var colors = [];
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
    if (request.method === "getColors") {
	  var colors = getColors();
      sendResponse({data: colors});
    }

	if (request.method === "getAllOptions") {
	  var toReturn = [];
	  toReturn.colors = getColors();

	  if(localStorage.autorun === undefined) {
		localStorage.autorun = true;
	  }

	  sendResponse({colors: toReturn, autorun:localStorage.autorun, cascade:localStorage.cascade});
    }
});