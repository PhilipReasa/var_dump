/* JSHINT info */
/* exported COLORS, AUTORUN, CASCADE, SHOW_DATA_TYPES, DEBUG_PRINTJSON, SPECIAL_CLASS, KEY_TEXT  */
/* globals chrome*/ 

//system wide configuration settings
var COLORS; 
var AUTORUN;
var CASCADE;
var SHOW_DATA_TYPES;
var SPECIAL_CLASS = "VAR_DUMP-DEADBEEF"; //if you change this, you also must change it in scss
var KEY_TEXT = ": ";

//load the globals!
chrome.extension.sendRequest({method: "getAllOptions"}, function(response) {
	COLORS = response.colors;
	AUTORUN = response.autorun; 
	CASCADE = response.cascade;
	SHOW_DATA_TYPES = response.showDataTypes

	//when the data retrueval is done, see if we should try to run:
	if(AUTORUN === "true") {
		bootstrap_vardump();
	}
});