function TreeNode(content){
	this.level = 0;
	this.children = new Array();
	this.parent = undefined;
	this.content = new ContentItem(content, this);
}

TreeNode.prototype.addChild = function(child){
	if(!DEBUG_PRINTJSON){child.parent = this;}
	child.level = this.level + 1;
	
	this.children.push(child);
}

TreeNode.prototype.print = function(text) {
	var MassCommandTool = "<div class='all'><span class='openall'>open all +</span>    <span class='closeall'>close all -</span></div>"

	if(text == undefined) {
		var text = "<div class='" + SPECIAL_CLASS + "'><div id='var_dump'>" + MassCommandTool;
		var first = true;
	}

	
	text += (this.content.printOpening());
	
	var i =0;
	while(i < this.children.length) {
		text = this.children[i].print(text);
		i++;
	}
	
	text += (this.content.printClosing());
	
	if(first) {
		text += MassCommandTool + "</div></div>" //close the #var_dump div and special_id div
	}
	
	return text;
}