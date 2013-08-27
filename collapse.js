function collapse(evt) {
	var collapser = evt.target;
	if(collapser.innerHTML == "- "){
		$(collapser).siblings("ul").children().addClass('hide');
		collapser.innerHTML = '+ ';
	} else {
		$(collapser).siblings("ul").children().removeClass('hide');
		collapser.innerHTML = '- ';
	}
}

function hoverIn(evt) {
	var hovered = evt.target;
	$(hovered).parent('li').addClass('hover');
}

function hoverOut(evt) {
	var hovered = evt.target;
	$(hovered).parent('li').removeClass('hover');
}