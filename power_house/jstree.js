/**
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
	if(!DEBUG_PRINTJSON){child.parent = this;}
	child.level = this.level + 1;
	
	this.children.push(child);
};

/**
*	Gives the TreeNode a print menthod
*/
TreeNode.prototype.print = function(text) {
	"use strict";
	var MassCommandTool,
		first,
		i;
		
	MassCommandTool = "<div class='all'><span class='openall'>open all +</span>    <span class='closeall'>close all -</span></div>";

	if(text == undefined) {
		text = "<div class='" + SPECIAL_CLASS + "'><div id='var_dump'>" + MassCommandTool;
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
		text += MassCommandTool + "</div></div>"; //close the #var_dump div and special_id div
	}
	
	return text;
};