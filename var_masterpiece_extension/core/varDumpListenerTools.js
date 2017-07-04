const varDumpListenerTools = (cascade, specialClass) => {
    function toggleCollapse() {
        var $collapser = $(this);

        if ($collapser.hasClass("closed")) { //if it is closed
            $collapser.siblings("ul").children("li").removeClass('hide');
            $collapser.removeClass("closed");
        } else { //if it is open
            collapse($collapser) // collapse this element

            if(cascade === "true") { //if we want to cascade down, collapse the other elements as well
                collapseAllChildren($collapser.siblings("ul"))
            }
        }
    }

    function collapse($element) {
        $element.siblings("ul").children("li").addClass('hide');
        $element.addClass("closed");
    }

    function collapseAllChildren($start) {
        var all = $start.find(".openClose .openCloseIcon"), //get all collapsers ...
            i = 0;
        while (i < all.length) { //... and close them
            collapse($(all[i]));
            i++;
        }
    }

    function openAll() {
        const $varDumpChildren = $("#var_dump").find("*")
        $varDumpChildren.removeClass('hide'); // remove the hide class from everything
        $varDumpChildren.removeClass('closed'); // <-- could be way more efficient
    }

    function closeAll() {
        collapseAllChildren($("#var_dump"))
    }

    function toggleFullScreen() {
        $(".var_dump_modal").toggleClass('fullScreen')
    }

    function addListeners() {
        $('.openClose .openCloseIcon').bind('click', toggleCollapse);
        $('#expandAll').bind('click', openAll);
        $('#collapseAll').bind('click', closeAll);
        $('.fullScreen').bind('click', toggleFullScreen);
        addCloseListener();
    }

    function addCloseListener() {
        $('.closeModal').bind('click', function() {
            $("." + specialClass).remove();
        });
    }

    return {
        addListeners: addListeners,
        addCloseListener: addCloseListener
    }
}