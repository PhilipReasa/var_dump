function TreeNode(content){
	this.level = 0;
	this.children = new Array();
	this.parent = undefined;
	this.content = new ContentItem(content);
}

TreeNode.prototype.addChild = function(child){
	if(!DEBUG){child.parent = this;}
	child.level = this.level + 1;
	
	this.children.push(child);
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
	
	text += (this.content.print() + "</br>");
	
	var i =0;
	while(i < this.children.length) {
		text = this.children[i].print(text);
		i++;
	}
	
	return text;
}