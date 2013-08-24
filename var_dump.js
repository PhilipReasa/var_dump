/**
* Returns string of a var_dump. if no vardumps found, returns false
*/
function whatShoudWeBeautify() {
	var toReturn = $("body").html();
	if(toReturn.substring(0,4) == "object".substring(0,4)) {
		return splitDump(toReturn);
	}
	
	if(toReturn.substring(0,4) == "array".substring(0,4)) {
		return splitDump(toReturn);
	}
	
	return false
}

function splitDump(dump) {
	return dump.split("\n");
}

function removeTheDump() {
	$("body").empty()
}

function printTheTree(tree, text) {
	if(text == undefined) {
		var text = "<pre>";
		var first = true;
	}

	var i = 0;
	while(i<tree.level) {
		text += " "
		i++;
	}
	
	text += (tree.content + "</br>");
	
	var i =0;
	while(i < tree.children.length) {
		text = printTheTree(tree.children[i], text);
		i++;
	}
	
	if(first) {
		text += "</pre>"
		$('body').append(text);
	}
	
	return text;
}

function generateTheTree(dump, parent) {
	
	if(parent == undefined) { //first call
		parent = new TreeNode("root");
	}
	
	var i = 0;
	while(i < dump.length) {
	
		var isCurrentItemLevelEnd = (dump[i].indexOf("}") == -1)?false:true;
		var doesNewLevelOpen = (dump[i].indexOf("{") == -1)?false:true;
	
		if(isCurrentItemLevelEnd) {
			return parent;
		}
	
		var newNode = new TreeNode(dump[i]);
			
		if(doesNewLevelOpen) {
			var tempDump = dump.slice() //shallow copy is enough
			newNode = generateTheTree(tempDump.splice(i+1,tempDump.length), newNode)
			i = whereDoesLevelClose(dump,i); //skip over child stuff
		}
		
		parent.addChild(newNode);
		i++;
	}
	
	return parent;
}

function whereDoesLevelClose(dump, i) {
	i ++;
	var numOfOParens = 0;
	while(i < dump.length) {
		if(dump[i].indexOf("{") != -1) {
			numOfOParens ++;
		} else if(dump[i].indexOf("}") != -1) {
			if(numOfOParens == 0) {
				return i;
			} else {
				numOfOParens --;
			}
		}
		i++;
	}
}

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

var dump = whatShoudWeBeautify() 

if(dump) {
	removeTheDump();
	
	var tree = generateTheTree(dump);
	printTheTree(tree);
}

