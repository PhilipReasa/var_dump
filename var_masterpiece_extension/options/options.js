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

  chrome.storage.local["intColor"] = intColor;
  chrome.storage.local["floatColor"] = floatColor;
  chrome.storage.local["stringColor"] = stringColor;
  chrome.storage.local["boolColor"] = boolColor;
  chrome.storage.local["objectColor"] = objectColor;
  chrome.storage.local["arrayColor"] = arrayColor;
  chrome.storage.local["nullColor"] = nullColor;
  chrome.storage.local["cascade"] = document.getElementById("y-cas").checked;
  chrome.storage.local["autorun"] = document.getElementById("y-autoR").checked;

  // let user know options were saved.
  alert("options saved!");
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var intColor = chrome.storage.local["intColor"];
  var floatColor = chrome.storage.local["floatColor"];
  var stringColor = chrome.storage.local["stringColor"];
  var boolColor = chrome.storage.local["boolColor"];
  var objectColor = chrome.storage.local["objectColor"];
  var arrayColor = chrome.storage.local["arrayColor"];
  var nullColor = chrome.storage.local["nullColor"];

  //first time restore fix
  intColor = intColor == undefined ? "default" : intColor;
  floatColor = floatColor == undefined ? "default" : floatColor;
  stringColor = stringColor == undefined ? "default" : stringColor;
  boolColor = boolColor == undefined ? "default" : boolColor;
  objectColor = objectColor == undefined ? "default" : objectColor;
  arrayColor = arrayColor == undefined ? "default" : arrayColor;
  nullColor = nullColor == undefined ? "default" : nullColor;

  document.getElementById("int-color").value = intColor;
  document.getElementById("float-color").value = floatColor;
  document.getElementById("string-color").value = stringColor;
  document.getElementById("bool-color").value = boolColor;
  document.getElementById("object-color").value = objectColor;
  document.getElementById("array-color").value = arrayColor;
  document.getElementById("null-color").value = nullColor;
  document.getElementById("y-cas").checked =
    chrome.storage.local["cascade"] === "true";
  document.getElementById("n-cas").checked =
    chrome.storage.local["cascade"] === "false";
  document.getElementById("y-autoR").checked =
    chrome.storage.local["autorun"] === "true";
  document.getElementById("n-autoR").checked =
    chrome.storage.local["autorun"] === "false";
}

document.addEventListener("DOMContentLoaded", function () {
  restore_options();
  document.querySelector("#save").addEventListener("click", save_options);
});
