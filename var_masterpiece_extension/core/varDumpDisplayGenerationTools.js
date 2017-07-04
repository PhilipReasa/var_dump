/**
 * @returns {{getVarDumpHtml: printVarDump}}
 */
const varDumpGenerationTools = () => {

    function printVarDump(dumpObject) {
        var printString = "<div id='var_dump'><ul id='root'>";

        printString += printObject(dumpObject);

        printString += "</ul></div>";

        return printString;
    }

    function printObject(object) {
        var expandCollapseImgSrc = chrome.extension.getURL("images/angle-arrow-down.svg");
        var generatedHTML = "";
        switch (object.type) {
            case "object":
                var objectName = object.className.namespace.join("\\") + object.className.class;
                var referenceId = object.referenceId;
                var propertyCount = object.properties;
                let propertyText = "properties"
                if(propertyCount == 1) {
                    propertyText = "property"
                }

                generatedHTML += "" +
                    "<li class='openClose'>" +
                    "<span class='svgIcon openCloseIcon'>" +
                    "<img src='" + expandCollapseImgSrc + "'>" +
                    "</span>" +
                    "<span class='objectName'>" + objectName + " </span>" +
                    "<span class='object'>(object) " +
                    "<span class='objectRefernce'>[Object ID #" + referenceId + "]</span>" +
                    "<span class='propertyCount'>[" + propertyCount + " " + propertyText + "]</span>" +
                    "</span>" +
                    "<ul>";

                //for each property in an object, print the property and the value
                var childObject;
                for(var i = 0; i < object.values.length; i ++) {
                    childObject = object.values[i];

                    generatedHTML += "" +
                        "<li>" +
                        "<span class='key'>" + childObject.key + ": </span>" +
                        printObject(childObject.value) +
                        "</li>";
                }

                generatedHTML += "" +
                    "</ul>" +
                    "</li>";
                break;

            case "array":
                let elementText = "elements"
                if(object.count == 1) {
                    elementText = "element"
                }

                generatedHTML += "" +
                    "<li class='openClose'>" +
                    "<span class='svgIcon openCloseIcon'>" +
                    "<img src='" + expandCollapseImgSrc + "'>" +
                    "</span>" +
                    "<span class='array'>(array) " +
                    "<span class='arrayElementCount'>[" + object.count + " " + elementText + "]</span>" +
                    "</span>" +
                    "<ul>";

                //for each value in the array, print the key and the value
                var childObject;
                for(var i = 0; i < object.values.length; i ++) {
                    childObject = object.values[i];

                    generatedHTML += "" +
                        "<li>" +
                        "<span class='key'>" + childObject.key.toString().replace(/</g, "&lt;") + ": </span>" +
                        printObject(childObject.value) +
                        "</li>";
                }

                generatedHTML += "" +
                    "</ul>" +
                    "</li>";
                break;

            case "integer":
                generatedHTML += "<span class='int'>(integer) " + object.value + " </span>";
                break;

            case "float":
                generatedHTML += "<span class='float'>(float) " + object.value + " </span>";
                break;

            case "boolean":
                generatedHTML += "<span class='bool'>(boolean) " + object.value + " </span>";
                break;

            case "string":
                generatedHTML += "<span class='string'>(string) " + object.value.replace(/</g, "&lt;") + "</span>";
                break;

            case "null":
                generatedHTML += "<span class='null'>(null) NULL</span>";
                break;

            case "resource":
                generatedHTML += "<span class='resource'>(resource) " + object.value + "</span>"
                break;
        }

        return generatedHTML;
    }

    return {
        getVarDumpHtml: printVarDump
    }
}