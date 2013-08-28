//"use strict"; http://stackoverflow.com/a/1335881
function ContentItem(data, caller) {
	"use strict";
	data = data.trim();
	
	this.raw = data;
	this.node = caller ; //the containing node
	this.type = "";
	this.html = "";
	this.extraInfo = []; //first element is actual value, other elements are extra data
	this.compound = false;
	var openingQ = data.indexOf("\""),
		closingQ = data.indexOf("\"", openingQ + 1),
		openingP = data.indexOf("("),
		closingP = data.indexOf(")");
	
	//http://www.php.net/manual/en/language.types.intro.php
	//check primitive scalar types
	if (data.substring(0, 4) == "bool") {
		this.type = "boolean";
		this.html = "<span>boolean: " + data.substring(openingP + 1, closingP)+"</span>";
		this.extraInfo.push((data.substring(openingP, closingP) == true));
	} else if (data.substring(0, 3) == "int") {
		this.type = "integer";
		this.html = "<span>integer: " + data.substring(openingP + 1, closingP)+"</span>";
		this.extraInfo.push(parseInt(data.substring(openingP + 1, closingP)));
	} else if (data.substring(0, 4) == "float") {
		this.type = "float";
		this.html = "<span>float: " + data.substring(openingP + 1, closingP)+"</span>";
		this.extraInfo.push(parseFloat(data.substring(openingP + 1, closingP)));
	} else if (data.substring(0, 6) == "string") {
		this.type = "string";
		this.html = "<span>string: " + data.substring(openingQ + 1, closingQ)+"</span>";
		this.extraInfo.push(data.substring(openingQ + 1, closingQ));
		this.extraInfo.push("Length of String: " + data.substring(7, closingP));
	}

	// check compound types
	else if (data.substring(0, 5) == "array") {
		this.type = "array";
		this.html = "<span>array { ";
		this.compound = true;
		this.extraInfo.push("Number of Elements: " + data.substring(6, closingP));
	} else if (data.substring(0, 6) == "object") {
		this.type = "object";
		this.compound = true;
		this.html = "<span>object {";
		this.extraInfo.push("Object Name: " + data.substring(openingP + 1, closingP));
		this.extraInfo.push("Object Identifier: " + data.substring(closingP+1, data.indexOf(" ", closingP)));
	}

	// check special types
	// ignore resource..'cause I got no clue what those are :Packages
	else if (data == "NULL") {
		this.type = "NULL";
		this.html = "<span>NULL</span>";
	}

	// check for var dump things
	else if (data.indexOf("=&gt;") !== -1) {
		this.type = "key";
		this.html = "<span>"+data+"</span>";
	}

	// all other cases
	else {
		this.type = "unknown";
		this.html = "<span>"+data+"</span>";
		this.compound = true; //for the root case
	}
}

ContentItem.prototype.printOpening = function () {
	"use strict";
	
	var toPrint = "";
	switch(this.type) {
		case "object":
			if(this.node.parent.content.compound) {toPrint += '<li>';}
			toPrint += "<span class='OpenClose'>- </span><ul class='obj'>" + this.html + "[" + this.extraInfo[0] + "] [" + this.extraInfo[1] + "] </span>";
			break;
		case "array": 
			if(this.node.parent.content.compound) {toPrint += '<li>';}
			toPrint += "<span class='OpenClose'>- </span><ul class='array'>" + this.html + "[" + this.extraInfo[0] + "] </span>";
			break;
		case "integer":
		case "float":
			toPrint += "<span class='num'>" + this.html + "</span>";
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
			if(this.node.parent.content.compound) {toPrint += '<li>';}
			toPrint += "<span class='prop'>" + this.html + "</span>";
			break;
		case "unknown":
			if(this.node.parent == undefined) {
				toPrint += "<ul id='root'>"//"<span class='OpenClose'>- </span><ul>" + this.html;
			}
			break;
		default:
			toPrint += this.html
	}
	
	return toPrint;
};

ContentItem.prototype.printClosing = function () {
	"use strict";
	
	var toPrint = "";
	switch(this.type) {
		case "object":
			toPrint += "</ul>"
			if(this.node.parent.content.compound) {toPrint += "</li><span class='clear'></span>";}
			break;
		case "array": 
			toPrint += "</ul>";
			if(this.node.parent.content.compound) {toPrint += "</li><span class='clear'></span>";}
			break;
		case "key":
		case "unknown":
			if(this.node.content.html == "root") {
				toPrint += "</ul>";//<span class='clear'></span>" 
			}
			break;
		case "integer":
		case "float":
		case "boolean":
		case "string":
		case "NULL":
		default:
			if(this.node.parent.content.compound) {toPrint += "</li><span class='clear'></span>";}
	}
	
	return toPrint;
};