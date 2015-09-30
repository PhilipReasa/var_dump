/* JSHINT INFO*/
/* globals COLORS*/
/*jshint sub:true*/ //<-- we have JS reserved words as keys intentionally. This prevent warnings due to that

/*
* Creates all the inline style we need. Currently only colors. If we even need more, it should be done here
*/
function createStyleString(color) {
	return "style='color:" + color + "'";
}

function ContentItem(data, caller) {  
	"use strict";

	data = data.trim();

	this.raw = data;
	this.node = caller; //the containing TreeNode
	this.type = "";
	this.html = "";
	this.extraInfo = []; //first element is actual value, other elements are extra data
	this.compound = false;
	var openingQ = data.indexOf("\""),
		closingQ = data.lastIndexOf("\""), //last index of skips when "'s are in the string
		openingP = data.indexOf("("),
		closingP = data.indexOf(")");

	//http://www.php.net/manual/en/language.types.intro.php
	//check primitive scalar types
	if (data.substring(0, 4) === "bool") {
		this.type = "boolean";
		this.html = "<span " + createStyleString(COLORS["bool"]) +">(boolean) " + data.substring(openingP + 1, closingP) + "</span>";
		this.extraInfo.push((data.substring(openingP, closingP) === true));
	} else if (data.substring(0, 3) === "int") {
		this.type = "integer";
		this.html = "<span "+ createStyleString(COLORS["int"]) +">(integer) " + data.substring(openingP + 1, closingP) + "</span>";
		this.extraInfo.push(parseInt(data.substring(openingP + 1, closingP), 10));
	} else if (data.substring(0, 5) === "float") {
		this.type = "float";
		this.html = "<span "+ createStyleString(COLORS["float"]) +">(float) " + data.substring(openingP + 1, closingP) + "</span>";
		this.extraInfo.push(parseFloat(data.substring(openingP + 1, closingP)));
	} else if (data.substring(0, 6) === "string") {
		this.type = "string";
		this.html = "<span "+ createStyleString(COLORS["string"]) +">(string) " + data.substring(openingQ + 1, closingQ) + "</span>";
		this.extraInfo.push(data.substring(openingQ + 1, closingQ));
		this.extraInfo.push("Length of String: " + data.substring(7, closingP));
	}

	// check compound types
	else if (data.substring(0, 5) === "array") {
		this.type = "array";
		this.html = "<span "+ createStyleString(COLORS["array"]) +">(array) ";
		this.compound = true;
		this.extraInfo.push("Number of Elements: " + data.substring(6, closingP));
	} else if (data.substring(0, 6) === "object") {
		this.type = "object";
		this.compound = true;
		this.html = "<span "+ createStyleString(COLORS["object"]) +">(object) ";
		this.extraInfo.push("Object Name: " + data.substring(openingP + 1, closingP));
		this.extraInfo.push("Object Identifier: " + data.substring(closingP + 1, data.indexOf(" ", closingP)));
	}

	// check special types
	// ignore resource..'cause I got no clue what those are :Packages
	else if (data === "NULL") {
		this.type = "NULL";
		this.html = "<span "+ createStyleString(COLORS["null"]) +">(null) NULL</span>";
	}

	// check for var dump things
	else if (data.indexOf("=&gt;") !== -1) {
		this.type = "key";
		var temp = data.substring(1 /*skip initial [*/, data.length-6 /*skip ]=&gt;*/);
		this.html = "<span>" + temp + ": " + "</span>";
	}

	// all other cases
	else {
		this.type = "unknown";
		this.html = "<span>" + data + "</span>";
		this.compound = true; //for the root case
	}
}

ContentItem.prototype.printOpening = function () {
	"use strict";	
	
	var toPrint = "";
	switch (this.type) {
		case "object":
			if (this.node.parent.content.compound) {toPrint += '<li>'; }
			toPrint += "<span class='OpenClose'>- </span><ul class='obj'>" + this.html + "[" + this.extraInfo[0] + "] [" + this.extraInfo[1] + "] </span>";
			break;
		case "array":
			if (this.node.parent.content.compound) {toPrint += '<li>'; }
			toPrint += "<span class='OpenClose'>- </span><ul class='array'>" + this.html + "[" + this.extraInfo[0] + "] </span>";
			break;
		case "integer":
			toPrint += "<span class='int'>" + this.html + "</span>";
			break;
		case "float":
			toPrint += "<span class='float'>" + this.html + "</span>";
			break;
		case "boolean":
			toPrint += "<span class='bool'>" + this.html + "</span>";
			break;
		case "string":
			toPrint += "<span class='string'>" + this.html + "</span>";
			break;
		case "NULL":
			toPrint += "<span class='null'>" + this.html + "</span>";
			break;
		case "key":
			if (this.node.parent.content.compound) {toPrint += '<li>'; }
			toPrint += "<span class='prop'>" + this.html + "</span>";
			break;
		case "unknown":
			if (this.node.parent === undefined) {
				toPrint += "<ul id='root'>";
			}
			break;
		default:
			toPrint += this.html;
	}

	return toPrint;
};

ContentItem.prototype.printClosing = function () {
	"use strict";

	var toPrint = "";
	switch (this.type) {
		case "object":
			toPrint += "</ul>";
			if (this.node.parent.content.compound) {toPrint += "</li>"; }
			break;
		case "array":
			toPrint += "</ul>";
			if(this.node.parent.content.compound) {toPrint += "</li>";}
			break;
		case "key":
		case "unknown":
			if(this.node.content.html === "root") {
				toPrint += "</ul>";
			}
			break;
		default:
			if(this.node.parent.content.compound) {toPrint += "</li>";}
			break;
	}

	return toPrint;
};