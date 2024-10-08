(() => {
  var_dump_extension_DEADBEEF.varDumpGenerationTools = () => {
    function printVarDump(dumpArray) {
      let printString = '<div id="var_dump"><ul id="root">';

      dumpArray.forEach((varDump) => {
        printString += printObject(varDump);
      });

      printString += "</ul></div>";

      return printString;
    }

    function printObject(object) {
      const expandCollapseImgSrc = chrome.runtime.getURL(
        "images/angle-arrow-down.svg",
      );
      let generatedHTML = "";
      switch (object.type) {
        case "object": {
          const objectName =
            object.className.namespace.join("\\") + object.className.class;
          const referenceId = object.referenceId;
          const propertyCount = object.properties;
          const propertyText = propertyCount === 1 ? "property" : "properties";

          generatedHTML +=
            "" +
            '<li class="openClose">' +
            '<span class="svgIcon openCloseIcon">' +
            '<img src="' +
            expandCollapseImgSrc +
            '">' +
            "</span>" +
            '<span class="objectName">' +
            objectName +
            "</span>" +
            '<span class="object"> (object) ' +
            '<span class="objectReference">[Object ID #' +
            referenceId +
            "]</span>" +
            '<span class="propertyCount">[' +
            propertyCount +
            " " +
            propertyText +
            "]</span>" +
            "</span>" +
            "<ul>";

          // for each property in an object, print the property and the value
          object.values.forEach((childObject) => {
            generatedHTML +=
              "" +
              "<li>" +
              '<span class="key">' +
              childObject.key +
              ": </span>" +
              printObject(childObject.value) +
              "</li>";
          });

          generatedHTML += "" + "</ul>" + "</li>";
          break;
        }
        case "array": {
          const elementText = object.count === 1 ? "element" : "elements";

          generatedHTML +=
            "" +
            '<li class="openClose">' +
            '<span class="svgIcon openCloseIcon">' +
            '<img src="' +
            expandCollapseImgSrc +
            '">' +
            "</span>" +
            '<span class="array">(array) ' +
            '<span class="arrayElementCount">[' +
            object.count +
            " " +
            elementText +
            "]</span>" +
            "</span>" +
            "<ul>";

          // for each value in the array, print the key and the value
          object.values.forEach((childObject) => {
            generatedHTML +=
              "" +
              "<li>" +
              '<span class="key">' +
              childObject.key.toString().replace(/</g, "&lt;") +
              ": </span>" +
              printObject(childObject.value) +
              "</li>";
          });

          generatedHTML += "" + "</ul>" + "</li>";
          break;
        }
        case "integer": {
          generatedHTML +=
            '<span class="int">(integer) ' + object.value + " </span>";
          break;
        }
        case "float": {
          generatedHTML +=
            '<span class="float">(float) ' + object.value + " </span>";
          break;
        }
        case "boolean": {
          generatedHTML +=
            '<span class="bool">(boolean) ' + object.value + " </span>";
          break;
        }
        case "string": {
          generatedHTML +=
            '<span class="string">(string) "' +
            object.value.replace(/</g, "&lt;") +
            '"</span>';
          break;
        }
        case "null": {
          generatedHTML += '<span class="null">(null) NULL</span>';
          break;
        }
        case "resource": {
          generatedHTML +=
            '<span class="resource">(resource) ' + object.value + "</span>";
          break;
        }
        case "recursion": {
          generatedHTML +=
            '<span class="recursion">*' + object.value + "*</span>";
          break;
        }
        default: {
          generatedHTML +=
            '<span class="undefined">' + object.value + "</span>";
        }
      }

      return generatedHTML;
    }

    return {
      getVarDumpHtml: printVarDump,
    };
  };
})();
