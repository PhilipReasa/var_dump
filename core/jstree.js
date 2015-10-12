/* JSHINT info*/
/* globals ContentItem */
 
/*
*	Creates a tree based structure that will hold the parsed var_dump
*/
function TreeNode(content){
	"use strict";
	this.level = 0;
	this.children = [];
	this.parent = undefined;
	this.content = new ContentItem(content, this);
}

/**
*	Give the TreeNode an addchild method
*/
TreeNode.prototype.addChild = function(child) {
	"use strict";
	child.parent = this;
	child.level = this.level + 1;
	
	this.children.push(child);
};

/**
*	Gives the TreeNode a print menthod
*/
TreeNode.prototype.print = function(text) {
	"use strict";
	var first,
		i;

	if(text === undefined) {
		text = "<div id='var_dump'>";
		first = true;
	}


	text += (this.content.printOpening());

	i =0;
	while(i < this.children.length) {
		text = this.children[i].print(text);
		i++;
	}

	text += (this.content.printClosing());

	if(first) {
		text += "</div>"; //close the #var_dump div
	}
	
	return text;
};