function splitDump(dump) {
	return dump.split("\n");
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