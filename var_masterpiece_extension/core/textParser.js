/* JSHINT info */
/* exported generateTheTree */
/* globals TreeNode*/

//return -1 if not found
function getNextNonQuoteChar(C, data) {
	"use strict";
	var i = 0,
		numQuotes = 0,
		curChar;
		
	while(i < data.length) {
		curChar = data.charAt(i);
		if(curChar ===  C && (numQuotes%2 === 0)) {
			break;
		} else if (curChar === "\"") {
			numQuotes ++;
		}
		i ++;
	}
	if(i === data.length) {
		i = -1;
	}
	return i;
}

function whereDoesLevelClose(dump, i) {
	"use strict";
	i ++;
	var numOfOParens = 0,
		nextOpenC,
		nextClosedC;
		
	while(i < dump.length) {
		
		nextOpenC = getNextNonQuoteChar("{", dump[i]);
		nextClosedC = getNextNonQuoteChar("}", dump[i]);
		
		if(nextOpenC !== -1) {
			numOfOParens ++;
		} else if(nextClosedC !== -1) {
			if(numOfOParens === 0) {
				break;
			} else {
				numOfOParens --;
			}
		}
		i++;
	}
	
	return i;
}

function generateTheTree(dump, parent) {
	"use strict";
	
	var i = 0,
		isCurrentItemLevelEnd,
		doesNewLevelOpen,
		newNode,
		tempDump;
	
	if(parent === undefined) { //first call
		parent = new TreeNode("root");
	}
	
	while(i < dump.length) {
	
		isCurrentItemLevelEnd = (dump[i].indexOf("}") === -1)?false:true;
		doesNewLevelOpen = (dump[i].indexOf("{") === -1)?false:true;
	
		if(isCurrentItemLevelEnd) {
			return parent;
		}
	
		newNode = new TreeNode(dump[i]);

		/* UGLY FIX. COULD USE SOME LOVE
		 * if there is a new line in the middle of a string, things can get really messy.
		 * we sperate based on the new lines, so they completley mess up our parsing. 
		 * here we use the expected length of the string to detect when we only got a "partial"
		 * string, and then continue to look for the rest of it. */
		if(newNode.content.type === "string") {
			//the string is not as long as it should be
			if(parseInt(newNode.content.extraInfo[1]) !== newNode.content.extraInfo[0].length) {
				//add in the next node (assuming it is actually part of the same string)
				dump[i] = dump[i] + "\n" + dump[i + 1];

				//remove the next node ftom our list of nodes
				dump.splice(i+1, 1);

				continue; //try again
			} 
		}

		parent.addChild(newNode); //we can add here because JS is pass by reference
		
		if(doesNewLevelOpen) {
			tempDump = dump.slice(); //shallow copy is enough
			newNode = generateTheTree(tempDump.splice(i+1,tempDump.length), newNode);
			i = whereDoesLevelClose(dump,i); //skip over child stuff
		}
		
		
		i++;
	}
	
	return parent;
}

