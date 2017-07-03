/**
 * @param settings = {colors, autoRun, cascade, specialClass}
 * @type {{run, autoRun}}
 */
const varDumpModalTools = ((settings) => {
    const COLORS = settings.colors
    const AUTO_RUN = settings.autoRun
    const CASCADE = settings.cascade
    const SPECIAL_CLASS = settings.specialClass
    const collpasingTools = varDumpCollapsingTools(CASCADE, SPECIAL_CLASS)

    /**
     * Function to grab the slected text from the user.
     * A little more complex than normal, because we need to
     * preserve the \n's that we see. They are important for
     * parsing the var dump, and chrome has a bug that kills them
     * //http://stackoverflow.com/a/5670825
     */
    function getSelectionHtml() {
        let html = ""
        if (window.getSelection !== "undefined") {
            const sel = window.getSelection();
            if (sel.rangeCount) {
                let container = document.createElement("div");
                var len = sel.rangeCount;
                for (let i = 0; i < len; ++i) {
                    container.appendChild(sel.getRangeAt(i).cloneContents());
                }
                html = container.innerHTML;
            }
        } else if (typeof document.selection !== "undefined") {
            if (document.selection.type === "Text") {
                html = document.selection.createRange().htmlText;
            }
        }

        return html;
    }

    /**
     * Take a potential var dump and remove any preceding / trailing
     * chars that are not related to the dump
     *
     * @return the cleaned html
     */
    function removeBadChars(html) {
        // var dumps must start `array` or `object`
        const arrayStart = html.indexOf("array");
        const objectStart = html.indexOf("object");

        const arrayEnd = html.lastIndexOf("]");
        const objectEnd = html.lastIndexOf("}");

        let start = 0;
        let end = html.length;
        if(arrayStart > -1 && objectStart > -1) {
            start = Math.min(arrayStart, objectStart);
        } else if (arrayStart > -1) {
            start = arrayStart;
        } else if (objectStart > -1) {
            start = objectStart;
        }

        if(arrayEnd > -1 && objectEnd > -1) {
            end = Math.max(arrayEnd, objectEnd) + 1;
        } else if (arrayEnd > -1) {
            end = arrayEnd + 1;
        } else if (objectEnd > -1) {
            end = objectEnd + 1;
        }

        return html.substr(start, end);
    }

    /**
     * Returns string of a var_dump. if no vardumps found, returns false
     *
     * Currently takes the niave approach at looking for a var dump right at
     * the begining of the page, and nowhere else. Only looks for arrays and objects
     *
     * returns string if var dump found, false otherwise
     */
    function findVarDump() {
        var toReturn = $("body").html().trim();
        if(toReturn.substring(0,6) === "object") {
            return toReturn;
        }

        if(toReturn.substring(0,5) === "array") {
            return toReturn;
        }

        return null;
    }


    function openVarDump() {
        return "<div class='"+SPECIAL_CLASS+"'>"
    }

    function closeVarDump() {
        return "</div>";
    }

    function openModalHTML() {
        return openVarDump() + "<div class='var_dump_modal'>";
    }

    function closeModalHTML() {
        return "</div>" + closeVarDump();
    }

    function failedHeaderHTML(dump) {
        var body = encodeURIComponent(dump);
        body = body.replace(/'/g, "%27");

        return "<div id='header'>" +
            "<div class='closeModal'><img class='svgIcon' src='" + chrome.extension.getURL("images/cross-mark-on-a-black-circle-background.svg") + "'></div>" +
            "</div>" +
            "<div class='failedMessage'>We were not able to parse this var_dump. If this is a valid var_dump, please " +
            "<a href='mailto:varmasterpiece@gmail.com?subject=Parsing%20Error&body=" + body + "'>notify us</a> so we can get this fixed!" +
            "</div>";
    }

    function headerHTML() {
        return "<div id='header'>" +
            "<div id='expandAll'><img class='svgIcon' src='" + chrome.extension.getURL("images/chevron-sign-down.svg") + "'> Expand All </div>" +
            "<div id='collapseAll'><img class='svgIcon rotate180' src='" + chrome.extension.getURL("images/chevron-sign-down.svg") + "'> Collapse All </div>" +
            "<div class='closeModal'><img class='svgIcon' src='" + chrome.extension.getURL("images/cross-mark-on-a-black-circle-background.svg") + "'></div>" +
            "</div>";
    }

    function getColorVal(color) {
        if(color === undefined) {
            return "inherit";
        } else {
            return color;
        }
    }

    function generateInlineStyles() {
        return '' +
            '<style class="VAR_DUMP-DEADBEEF" type="text/css">' +
            '.VAR_DUMP-DEADBEEF #var_dump .bool 	{ color:' + getColorVal(COLORS["bool"]) + 	'; } \n' +
            '.VAR_DUMP-DEADBEEF #var_dump .int 	{ color:' + getColorVal(COLORS["int"]) + 	'; } \n' +
            '.VAR_DUMP-DEADBEEF #var_dump .float { color:' + getColorVal(COLORS["float"]) + 	'; } \n' +
            '.VAR_DUMP-DEADBEEF #var_dump .null 	{ color:' + getColorVal(COLORS["null"]) + 	'; } \n' +
            '.VAR_DUMP-DEADBEEF #var_dump .array { color:' + getColorVal(COLORS["array"]) + 	'; } \n' +
            '.VAR_DUMP-DEADBEEF #var_dump .object { color:' + getColorVal(COLORS["object"]) + '; } \n' +
            '.VAR_DUMP-DEADBEEF #var_dump .string { color:' + getColorVal(COLORS["string"]) + '; } \n' +
            '</style>'
    }

    /**
     * Given var dump text, this will create a modal with the var dump
     * tree inside.
     *
     * Dump contains the text of the var dump
     * Explicit is a flag to determin if this is an automatic var dump, or an explicitly user
     * triggered call.
     */
    function printModalTree(dump, explicit) {
        dump = dump.trim();
        var modalOpen = openModalHTML();
        var modalClose = closeModalHTML();

        var varDumpObject;
        try {
            varDumpObject = parseVarDump(dump);
        } catch(e) {
            if(!explicit) {
                //we tried to auto run, but didn't find anything. Die quietly
                return;
            } else {
                //the user tied to prettify a var dump, and we failed to parse it. Take Plan 2
                var failedHeader = failedHeaderHTML(dump);
                $('body').append(modalOpen + failedHeader + "<pre>" + dump + "</pre>" + modalClose);
                addCloseListener();
                return;
            }
        }

        //generate our header
        var header = headerHTML();

        //add out html / styles / listeners to the page
        $('body').append(generateInlineStyles());
        $('body').append(modalOpen + header + printVarDump(varDumpObject) + modalClose);
        collpasingTools.addListeners();
    }

    function bootstrap_vardump() {
        var dump = findVarDump();

        //If we think that the whole page is a var dump
        if(dump) {
            printModalTree(dump, false);
        }
    }

    function run() {
        var html = getSelectionHtml();
        html = removeBadChars(html);
        printModalTree(html, true);
    }

    return {
        run: run,
        autoRun: bootstrap_vardump
    }
})