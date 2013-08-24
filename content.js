//"use strict"; http://stackoverflow.com/a/1335881
function ContentItem(data) {
	"use strict";
	data = data.trim();

	this.raw = data;
	this.type = "";
	this.html = "";
	this.extraInfo = []; //first element is actual value, other elements are extra data
	this.primitive = "";
	var openingQ = data.indexOf("\""),
		closingQ = data.indexOf("\"", openingQ + 1),
		openingP = data.indexOf("("),
		closingP = data.indexOf(")");

	//http://www.php.net/manual/en/language.types.intro.php
	//check primitive scalar types
	if (data.substring(0, 4) == "bool") {
		this.type = "boolean";
		this.html = "Boolean: " + data.substring(openingP + 1, closingP);
		this.extraInfo.push((data.substring(openingP, closingP) == true));
	} else if (data.substring(0, 3) == "int") {
		this.type = "integer";
		this.html = "integer: " + data.substring(openingP + 1, closingP);
		this.extraInfo.push(parseInt(data.substring(openingP + 1, closingP)));
	} else if (data.substring(0, 4) == "float") {
		this.type = "float";
		this.html = "float: " + data.substring(openingP + 1, closingP);
		this.extraInfo.push(parseFloat(data.substring(openingP + 1, closingP)));
	} else if (data.substring(0, 6) == "string") {
		this.type = "string";
		this.html = "string: " + data.substring(openingQ + 1, closingQ);
		this.extraInfo.push(data.substring(openingQ + 1, closingQ));
		this.extraInfo.push("Length of String: " + data.substring(7, closingP));
	}

	// check compound types
	else if (data.substring(0, 5) == "array") {
		this.type = "array";
		this.html = "array";
		this.extraInfo.push("Number of Elements: " + data.substring(6, closingP));
	} else if (data.substring(0, 6) == "object") {
		this.type = "object";
		this.html = data.substring(8, data.length);
		//TODO: Don't think this is complete
	}

	// check special types
	// ignore resource..'cause I got no clue what those are :Packages
	else if (data == "NULL") {
		this.type = "NULL";
		this.html = "NULL";
	}

	// check for var dump things
	else if (data.indexOf("=&gt;") !== -1) {
		this.type = "key";
		this.html = data;
	}

	// all other cases
	else {
		this.type = "unknown";
		this.html = data;
	}
}

ContentItem.prototype.print = function () {
	"use strict";
	return this.html;
};