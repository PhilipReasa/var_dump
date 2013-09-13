// Save this script as `options.js`

// Saves options to localStorage.
function save_options() {
  var intColor = document.getElementById("int-color").value;
  var floatColor = document.getElementById("float-color").value;
  var stringColor = document.getElementById("string-color").value;
  var boolColor = document.getElementById("bool-color").value;
  var objectColor = document.getElementById("object-color").value;
  var arrayColor = document.getElementById("array-color").value;
  var nullColor = document.getElementById("null-color").value;
  
  localStorage["intColor"] = intColor;
  localStorage["floatColor"] = floatColor;
  localStorage["stringColor"] = stringColor;
  localStorage["boolColor"] = boolColor;
  localStorage["objectColor"] = objectColor;
  localStorage["arrayColor"] = arrayColor;
  localStorage["nullColor"] = nullColor;

  // let user know options were saved.
  alert('options saved!');
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var intColor = localStorage["intColor"]
  var floatColor = localStorage["floatColor"]
  var stringColor = localStorage["stringColor"]
  var boolColor = localStorage["boolColor"]
  var objectColor = localStorage["objectColor"]
  var arrayColor = localStorage["arrayColor"]
  var nullColor = localStorage["nullColor"]
  
  //first time restore fix
  intColor = (intColor == undefined)? "default": intColor;
  floatColor = (floatColor == undefined)? "default": floatColor;
  stringColor = (stringColor == undefined)? "default": stringColor;
  boolColor = (boolColor == undefined)? "default": boolColor;
  objectColor = (objectColor == undefined)? "default": objectColor;
  arrayColor = (arrayColor == undefined)? "default": arrayColor;
  nullColor = (nullColor == undefined)? "default": nullColor;

  document.getElementById("int-color").value = intColor;
  document.getElementById("float-color").value = floatColor;
  document.getElementById("string-color").value = stringColor;
  document.getElementById("bool-color").value = boolColor;
  document.getElementById("object-color").value = objectColor;
  document.getElementById("array-color").value = arrayColor;
  document.getElementById("null-color").value = nullColor;
}

document.addEventListener('DOMContentLoaded', function() {
	restore_options();
	document.querySelector('#save').addEventListener('click', save_options)
	});