/* JSHINT info */
/* exported COLORS, AUTORUN, CASCADE, DEBUG_PRINTJSON, SPECIAL_CLASS, KEY_TEXT  */
/* globals chrome*/ 

//system wide configuration settings
var COLORS; 
var AUTORUN;
var CASCADE;
var SPECIAL_CLASS = "VAR_DUMP-DEADBEEF"; //if you change this, you also must change it in scss
var KEY_TEXT = ": ";

//load the globals!
chrome.extension.sendRequest({method: "getAllOptions"}, function(response) {
	COLORS = response.colors;
	AUTORUN = response.autorun; 
	CASCADE = response.cascade;
});