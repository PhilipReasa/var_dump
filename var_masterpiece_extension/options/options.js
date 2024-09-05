// Save this script as `options.js`

// Saves options to localStorage.
async function save_options() {
  var intColor = document.getElementById("int-color").value;
  var floatColor = document.getElementById("float-color").value;
  var stringColor = document.getElementById("string-color").value;
  var boolColor = document.getElementById("bool-color").value;
  var objectColor = document.getElementById("object-color").value;
  var arrayColor = document.getElementById("array-color").value;
  var nullColor = document.getElementById("null-color").value;

  await chrome.storage.local.set({
    intColor: intColor,
    floatColor: floatColor,
    stringColor: stringColor,
    boolColor: boolColor,
    objectColor: objectColor,
    arrayColor: arrayColor,
    nullColor: nullColor,
    cascade: document.getElementById("y-cas").checked,
    autorun: document.getElementById("y-autoR").checked,
  });

  // let user know options were saved.
  alert("options saved!");
}

// Restores select box state to saved value from localStorage.
async function restore_options() {
  const colorPromise = new Promise((resolve) => {
    const colorKeys = [
      "intColor",
      "floatColor",
      "stringColor",
      "boolColor",
      "objectColor",
      "arrayColor",
      "nullColor",
    ];
    chrome.storage.local.get(colorKeys).then((vals) => {
      resolve(
        colorKeys.reduce((acc, key) => {
          acc[key] = vals[key] === undefined ? "default" : vals[key];
          return acc;
        }, {}),
      );
    });
  });

  const otherPromise = new Promise((resolve) => {
    chrome.storage.local
      .get(["cascade", "autorun"])
      .then((vals) => resolve([vals["cascade"], vals["autorun"]]));
  });

  colors = await colorPromise;
  const [cascade, autorun] = await otherPromise;

  document.getElementById("int-color").value = colors.intColor;
  document.getElementById("float-color").value = colors.floatColor;
  document.getElementById("string-color").value = colors.stringColor;
  document.getElementById("bool-color").value = colors.boolColor;
  document.getElementById("object-color").value = colors.objectColor;
  document.getElementById("array-color").value = colors.arrayColor;
  document.getElementById("null-color").value = colors.nullColor;
  document.getElementById("y-cas").checked =
    cascade === "true" || cascade === true;
  document.getElementById("n-cas").checked =
    cascade === "false" || cascade === false;
  document.getElementById("y-autoR").checked =
    autorun === "true" || autorun === true;
  document.getElementById("n-autoR").checked =
    autorun === "false" || autorun === false;
}

document.addEventListener("DOMContentLoaded", () => {
  (async () => {
    await restore_options();
    document.querySelector("#save").addEventListener("click", save_options);
  })();

  return true;
});
