function collapse(evt) {
	if(evt.target == undefined) {
		var collapser = evt //for closeAll fn
	} else {
		var collapser = evt.target;
	}
	if(collapser.innerHTML == "- "){
		$(collapser).siblings("ul").children("li").addClass('hide');
		collapser.innerHTML = '+ ';
	} else {
		$(collapser).siblings("ul").children("li").removeClass('hide');
		collapser.innerHTML = '- ';
	}
}

function openAll(){
	$("#var_dump").find('*').removeClass('hide');
	$(".OpenClose").html("- ");
}

function closeAll() {
	var all = $(".OpenClose")
	var i =0;
	while(i < all.length) {
		collapse(all[i]);
		i++;
	}
}