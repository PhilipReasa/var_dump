const varDumpParsingTools = (() => {
    /**
     * Public function that runs the formal grammar parser against the provided text
     * @param dumpText text to be interpreted by the grammar
     * @returns {object} an object of the parsed text
     */
    function parseVarDump(dumpText) {
        dumpText = dumpText.trim();
        try {
            return varDumpParser.parse(dumpText)
        } catch(e) {
            // ignore the error for now. TODO: add better error handling
            console.log(e)
        }
    }

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

    function parseVarDumpFromPage() {
        const dumpText = findVarDump()
        return parseVarDump(dumpText);
    }

    function parseVarDumpFromSelection() {
        let dumpText = getSelectionHtml()
        dumpText = removeBadChars(dumpText)
        return parseVarDump(dumpText);
    }

    function getRawSelection() {
        let dumpText = getSelectionHtml()
        return removeBadChars(dumpText)
    }

    return {
        parseVarDumpFromPage: parseVarDumpFromPage,
        parseVarDumpFromSelection: parseVarDumpFromSelection,
        getRawSelection: getRawSelection
    }
})