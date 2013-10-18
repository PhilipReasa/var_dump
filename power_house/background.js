chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getColors") {
	  var colors = getColors();
      sendResponse({data: colors});
    }
	if (request.method == "getAllOptions") {
	  var toReturn = {};
	  toReturn["colors"] = getColors();

	  sendResponse({colors: toReturn, autorun:localStorage["autorun"], cascade:localStorage["cascade"]});
    }
});

function getColors() {
	var colors = {};
		  colors["int"] = ((localStorage["intColor"] == undefined)||(localStorage["intColor"] == "default"))?"":"style='color:"+ localStorage["intColor"] +"' ";
		  colors["float"] = ((localStorage["floatColor"] == undefined)||(localStorage["floatColor"] == "default"))?"":"style='color:"+ localStorage["floatColor"] +"' ";
		  colors["string"] = ((localStorage["stringColor"] == undefined)||(localStorage["stringColor"] == "default"))?"":"style='color:"+ localStorage["stringColor"] +"' ";
		  colors["null"] = ((localStorage["nullColor"] == undefined)||(localStorage["nullColor"] == "default"))?"":"style='color:"+ localStorage["nullColor"] +"' ";
		  colors["array"] = ((localStorage["arrayColor"] == undefined)||(localStorage["arrayColor"] == "default"))?"":"style='color:"+ localStorage["arrayColor"] +"' ";
		  colors["object"] = ((localStorage["objectColor"] == undefined)||(localStorage["objectColor"] == "default"))?"":"style='color:"+ localStorage["objectColor"] +"' ";
		  colors["bool"] = ((localStorage["boolColor"] == undefined)||(localStorage["boolColor"] == "default"))?"":"style='color:"+ localStorage["boolColor"] +"' ";
	return colors;
}