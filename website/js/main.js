$(function() {
	var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

	if(!is_chrome) {
		$("#notChrome").modal('show');
	}
	
	if(typeof(bootstrap_vardump) === "function") {
		alert("var_dump detected");
	}
});