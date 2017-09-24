let varDumpModalToolsInstance

/*
 * This is where the real "bootstraping" happens. On every page load, we initialize the varDumpTool,
 * and then autorun if enabled
 */
chrome.extension.sendRequest({action: 'getAllOptions'}, (response) => {

    // this little snipit makes sure that we have hidden the gift box after a donation
    google.payments.inapp.getPurchases({
        parameters: {env: 'prod'},
        success: (purchases) => {
            const activePurchases = purchases.response.details.filter((element) => {
                return element.state === 'ACTIVE'
            })

            if (activePurchases.length > 0) {
                chrome.extension.sendRequest({action: 'saveDonation'})
            }
        },
    });

    varDumpModalToolsInstance = varDumpModalTools({
        colors: response.colors,
        autoRun: response.autorun,
        cascade: response.cascade,
        donated: response.donated,
        specialClass: 'VAR_DUMP-DEADBEEF'
    })

    // when the data retrieval is done, see if we should try to run:
    if (response.autorun === 'true') {
        varDumpModalToolsInstance.autoRun()
    }
});

chrome.extension.onMessage.addListener((message) => {
    if (message.action === 'displayVarDump') { // sent from context menu
        varDumpModalToolsInstance.run()
    }
})
