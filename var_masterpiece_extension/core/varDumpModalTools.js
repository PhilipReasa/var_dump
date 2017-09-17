/**
 * @param settings {{colors, autoRun, cascade, specialClass}}
 * @type {{run, autoRun}}
 */
window.varDumpModalTools = (settings) => {
    const COLORS = settings.colors
    const CASCADE = settings.cascade
    const SPECIAL_CLASS = settings.specialClass
    const listenerTools = varDumpListenerTools(CASCADE, SPECIAL_CLASS)
    const parsingTools = varDumpParsingTools()
    const displayGenerationTools = varDumpGenerationTools()

    function openVarMasterpiece() {
        return '<div class="' + SPECIAL_CLASS + '">' + generateInlineStyles()
    }

    function closeVarMasterpiece() {
        return '</div>';
    }

    function openModalHTML() {
        return openVarMasterpiece() + "<div class='var_dump_modal'>";
    }

    function closeModalHTML() {
        return '</div>' + closeVarMasterpiece();
    }

    function failedHeaderHTML() {
        return '' +
        '<div id="header">' +
            '<div class="closeModal">' +
                '<img class="svgIcon" src="' + chrome.extension.getURL('images/close.svg') + '">' +
            '</div>' +
        '</div>'
    }

    function failedMessageHTML(dump) {
        let body = encodeURIComponent(dump);
        body = body.replace(/'/g, '%27');

        return '' +
            '<div class="failedMessage">' +
                'We were not able to parse this var_dump. If this is a valid var_dump, please ' +
                '<a href="mailto:varmasterpiece@gmail.com?subject=Parsing%20Error&body=' + body + '">notify us</a> ' +
                'so we can get this fixed!' +
            '</div>';
    }

    function headerHTML() {
        return '' +
        '<div id="header">' +
            '<div class="iconContainer">' +
                '<div id="expandAll">' +
                    '<img class="svgIcon" src="' + chrome.extension.getURL('images/chevron-sign-down.svg') + '">' +
                    'Expand All' +
                '</div>' +
                '<div id="collapseAll">' +
                    '<img class="svgIcon rotate180" src="' + chrome.extension.getURL('images/chevron-sign-down.svg') + '">' +
                    'Collapse All' +
                '</div>' +
                '<div class="closeModal">' +
                    '<img class="svgIcon" src="' + chrome.extension.getURL('images/close.svg') + '">' +
                '</div>' +
                '<div class="settings">' +
                    '<img class="svgIcon" src="' + chrome.extension.getURL('images/gear.svg') + '">' +
                '</div>' +
                '<div class="fullScreen">' +
                    '<img class="svgIcon" src="' + chrome.extension.getURL('images/expand.svg') + '">' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    function getColorVal(color) {
        if (color === undefined) {
            return 'inherit';
        } else {
            return color;
        }
    }

    function generateInlineStyles() {
        return '' +
            '<style type="text/css">' +
            '.' + SPECIAL_CLASS + ' #var_dump .bool { color:' + getColorVal(COLORS.bool) + '; } \n' +
            '.' + SPECIAL_CLASS + ' #var_dump .int { color:' + getColorVal(COLORS.int) + '; } \n' +
            '.' + SPECIAL_CLASS + ' #var_dump .float { color:' + getColorVal(COLORS.float) + '; } \n' +
            '.' + SPECIAL_CLASS + ' #var_dump .null { color:' + getColorVal(COLORS.null) + '; } \n' +
            '.' + SPECIAL_CLASS + ' #var_dump .array { color:' + getColorVal(COLORS.array) + '; } \n' +
            '.' + SPECIAL_CLASS + ' #var_dump .object { color:' + getColorVal(COLORS.object) + '; } \n' +
            '.' + SPECIAL_CLASS + ' #var_dump .string { color:' + getColorVal(COLORS.string) + '; } \n' +
            '</style>'
    }

    /**
     * Given var dump text, this will create a modal with the var dump
     * tree inside.
     *
     * Dump contains the text of the var dump
     */
    function printModalTree(varDumpArray) {
        const $body = $('body')
        const modalOpen = openModalHTML();
        const modalClose = closeModalHTML();

        if (varDumpArray === null || varDumpArray === undefined) {
            // the user tied to prettify a var dump, and we failed to parse it. Take Plan 2
            const failedHeader = failedHeaderHTML();
            const failedMessage = failedMessageHTML(parsingTools.getRawSelection())
            $body.append(
                modalOpen +
                failedHeader +
                '<div id="var_dump">' +
                failedMessage +
                '<pre>' + parsingTools.getRawSelection() + '</pre>' +
                '</div>' +
                modalClose
            );
            listenerTools.addCloseListener();
            return;
        }

        // generate our header
        const header = headerHTML();

        // add out html / styles / listeners to the page
        $body.append(
            modalOpen +
            header +
            displayGenerationTools.getVarDumpHtml(varDumpArray) +
            modalClose
        )
        listenerTools.addListeners()
    }

    function bootstrapVardump() {
        const varDumpArray = parsingTools.parseVarDumpFromPage()

        // If we think that the whole page is a var dump
        if (varDumpArray !== undefined && varDumpArray !== null) {
            printModalTree(varDumpArray);
        }
    }

    function run() {
        const varDumpArray = parsingTools.parseVarDumpFromSelection()
        printModalTree(varDumpArray);
    }

    return {
        run: run,
        autoRun: bootstrapVardump
    }
}
