function TreeNode(content){
	this.level = 0;
	this.children = new Array();
	this.parent = undefined;
	this.content = content;
}

TreeNode.prototype.addChild = function(child){
	this.children.push(child);
	child.parent = this;
	child.level = this.level + 1;
}

TreeNode.prototype.print = function(text) {
	if(text == undefined) {
		var text = "<pre>";
		var first = true;
	}

	var i = 0;
	while(i<this.level) {
		text += " "
		i++;
	}
	
	text += (this.content + "</br>");
	
	var i =0;
	while(i < this.children.length) {
		text = this.children[i].print(text);
		i++;
	}
	
	return text;
}