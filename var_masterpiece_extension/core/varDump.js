let varDumpModalToolsInstance;

/*
 * This is where the real "bootstraping" happens. On every page load, we initialize the varDumpTool,
 * and then autorun if enabled
 */
chrome.runtime.sendMessage({ action: "getAllOptions" }, (response) => {
  console.log("response", response);
  varDumpModalToolsInstance = varDumpModalTools({
    colors: response.colors,
    autoRun: response.autorun,
    cascade: response.cascade,
    specialClass: "VAR_DUMP-DEADBEEF",
  });

  // when the data retrieval is done, see if we should try to run:
  if (response.autorun === "true" || response.autorun === true) {
    varDumpModalToolsInstance.autoRun();
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "displayVarDump") {
    // sent from context menu
    varDumpModalToolsInstance.run();
  }
});
