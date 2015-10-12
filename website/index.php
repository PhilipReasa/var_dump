<!DOCTYPE html>
<html>
<head>
	<title>Var_Masterpiece</title>
	<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="bower_components/fontawesome/css/font-awesome.min.css">
	<link href='https://fonts.googleapis.com/css?family=Roboto:400,700,900,300' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="css/main.css">
	<link rel="stylesheet" href="css/var_dump.css">
	
	<script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
	<script type="text/javascript" src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

	<script type="text/javascript" src="js/main.js"></script>
</head>

<body>
	<nav class="navbar navbar-custom">
	  	<div class="container-fluid">
			<a class="navbar-brand" target="_blank" href="https://chrome.google.com/webstore/detail/varmasterpiece/chfhddogiigmfpkcmgfpolalagdcamkl/related">
				<img class="pull-left" alt="Brand" height="20px" src="img/icon2_128_tightcrop.png">
		  		<span class="pad-left-s">Var Masterpiece</span>
			</a>

	  		<a class="probity pull-right" target="_blank" href="http://www.probitytechnology.com">
				Probity Technology
	  		</a>
    	</div>
    </nav>

    <section>
    	<div class="row">
    		<h1 class="col-sm-12 pad-top-m text-center">
				Making Var_Dumps Beautiful
	    	</h1>
    	</div>
    	
		<div class="row">
			<div class="col-sm-offset-2 col-sm-8">
				<section id="example" class="margin-top-m">
					<?php 
					require_once("php/ExampleObject.php");
					$example = new ExampleObject();
					var_dump($example);
					?>
				</section>
			</div>
		</div>
		
		<div class="row margin-top-m">
			<div class="col-sm-8 col-sm-offset-2">
				<button id="showVarDump" class="btn btn-defualt"> Make Beautifull </button>
			</div>
		</div>

		<div class="row margin-top-m">
			<div class="col-sm-8 col-sm-offset-2">
				<a href="https://chrome.google.com/webstore/detail/varmasterpiece/chfhddogiigmfpkcmgfpolalagdcamkl/related" target="_blank" class="btn btn-defualt"> Get the Chrome Extension </a>
			</div>
		</div>
		
    </section> 

    <div class="modal fade" id="notChrome" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel">Chrome Extension</h4>
	      </div>
	      <div class="modal-body">
	        This website is for a chrome extension. It doesn't look like you are using chrome, hence this website is really no use to you :( sorry!
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">Got it</button>
	      </div>
	    </div>
	  </div>
	</div>

	<div class="VAR_DUMP-DEADBEEF"><div class="var_dump_modal"><div id="header"><div id="expandAll"><i class="fa fa-chevron-circle-down"></i> Expand All </div><div id="collapseAll"><i class="fa fa-chevron-circle-up"></i> Collapse All </div><div class="closeModal"><i class="fa fa-close"></i></div></div><div id="var_dump"><ul id="root"><li class="openClose"><span class="openCloseIcon fa fa-angle-down"></span><span class="object">(object)</span>[Object Name: ExampleObject] [Object Identifier: #1]<ul><li><span class="key">"ExtensionName": </span></li><li><span><span class="string">(string) Var_Masterpiece</span></span></li><li><span class="key">"AuthorName": </span></li><li><span><span class="string">(string) Philip Reasa</span></span></li><li><span class="key">"ExtensionAbilities": </span></li><li class="openClose"><span class="openCloseIcon fa fa-angle-down"></span><span class="array">(array)</span>[Number of Elements: 4]<ul><li><span class="key">"Tree Nesting Structure": </span></li><li class="openClose"><span class="openCloseIcon fa fa-angle-down"></span><span class="array">(array)</span>[Number of Elements: 3]<ul><li><span class="key">"Arbitrary Debpth?": </span></li><li><span><span class="string">(string) Yup!</span></span></li><li><span class="key">"Expanding and Collapsing?": </span></li><li><span><span class="string">(string) You bet</span></span></li><li><span class="key">"Associative Arrays?": </span></li><li><span><span class="string">(string) Apperantly :P</span></span></li></ul></li><li><span class="key">0: </span></li><li><span><span class="string">(string) Custimizable Data Type Coloring</span></span></li><li><span class="key">1: </span></li><li><span><span class="string">(string) Automatically Runs</span></span></li><li><span class="key">2: </span></li><li><span><span class="string">(string) Selectivly Run Within A Page</span></span></li></ul></li><li><span class="key">"GitHub": </span></li><li><span><span class="string">(string) Contribute here: https://github.com/Rece/var_dump</span></span></li><li><span class="key">"TestBooleans": </span></li><li><span><span class="bool">(boolean) true</span></span></li><li><span class="key">"TestInts": </span></li><li><span><span class="int">(integer) 1</span></span></li><li><span class="key">"TestFloats": </span></li><li><span><span class="float">(float) 3.14</span></span></li><li><span class="key">"TestNulls": </span></li><li><span><span class="null">(null) NULL</span></span></li></ul></li></ul></div></div></div>
	</body>
</html>
