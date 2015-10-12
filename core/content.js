/* JSHINT INFO*/
/*jshint sub:true*/ //<-- we have JS reserved words as keys intentionally. This prevent warnings due to that

//a content item is a key value pair. They key is the variable key, and the value is the value of that variable.
//this value may be a bool, int, float...or array/object.
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
		this.html = "<span class='bool'>(boolean) " + data.substring(openingP + 1, closingP) + "</span>";
		this.extraInfo.push((data.substring(openingP, closingP) === true));
	} else if (data.substring(0, 3) === "int") {
		this.type = "integer";
		this.html = "<span class='int'>(integer) " + data.substring(openingP + 1, closingP) + "</span>";
		this.extraInfo.push(parseInt(data.substring(openingP + 1, closingP), 10));
	} else if (data.substring(0, 5) === "float") {
		this.type = "float";
		this.html = "<span class='float'>(float) " + data.substring(openingP + 1, closingP) + "</span>";
		this.extraInfo.push(parseFloat(data.substring(openingP + 1, closingP)));
	} else if (data.substring(0, 6) === "string") {
		this.type = "string";
		this.html = "<span class='string'>(string) " + data.substring(openingQ + 1, closingQ) + "</span>";
		this.extraInfo.push(data.substring(openingQ + 1, closingQ));
		this.extraInfo.push("Length of String: " + data.substring(7, closingP));
	}

	// check compound types
	else if (data.substring(0, 5) === "array") {
		this.type = "array";
		this.html = "<span class='array'>(array)</span>";
		this.compound = true;
		this.extraInfo.push("Number of Elements: " + data.substring(6, closingP));
	} else if (data.substring(0, 6) === "object") {
		this.type = "object";
		this.compound = true;
		this.html = "<span class='object'>(object)</span>";
		this.extraInfo.push("Object Name: " + data.substring(openingP + 1, closingP));
		this.extraInfo.push("Object Identifier: " + data.substring(closingP + 1, data.indexOf(" ", closingP)));
	}

	// check special types
	// ignore resource..'cause I got no clue what those are :P
	else if (data === "NULL") {
		this.type = "NULL";
		this.html = "<span class='null'>(null) NULL</span>";
	}

	// check for var dump things
	else if (data.indexOf("=&gt;") !== -1) {
		this.type = "key";
		var temp = data.substring(1 /*skip initial [*/, data.length-6 /*skip ]=&gt;*/);
		this.html = "<span class='key'>" + temp + ": " + "</span>";
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
			toPrint += ""+
				"<li class='openClose'><span class='fa fa-angle-down'></span>"+ this.html + "[" + this.extraInfo[0] + "] [" + this.extraInfo[1] + "]" +
					"<ul>";

			break;
		case "array":
			toPrint += "" +
				"<li class='openClose'><span class='fa fa-angle-down'></span>"+ this.html + "[" + this.extraInfo[0] + "]" +
					"<ul>";

			break;
		case "integer":
		case "float":
		case "boolean":
		case "string":
		case "NULL":
			toPrint += "" +
				"<li>" +
					"<span>" + this.html + "</span>" +
				"</li>";
			break;
		case "key":
			toPrint += "" +
				"<li>" +
					this.html;
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
		case "array":
			toPrint += "</ul>";
			break;
		case "key":
			toPrint += "</li>"
			break;
		case "unknown":
			if(this.node.content.html === "root") {
				toPrint += "</ul>";
			}
			break;
		default:
			break;
	}

	if(this.node.parent) {
		//everything but the root needs to be closed
		toPrint += "</li>";
	}
	return toPrint;
};