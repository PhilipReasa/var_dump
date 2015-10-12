<!DOCTYPE html>
<html>
<head>
	<title>Var_Masterpiece</title>
	<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="bower_components/fontawesome/css/font-awesome.min.css">
	<link href='https://fonts.googleapis.com/css?family=Roboto:400,700,900,300' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="css/main.css">
	
	<script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
	<script type="text/javascript" src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
</head>

<body>
	<nav class="navbar navbar-custom">
	  	<div class="container-fluid">
			<a class="navbar-brand" href="#">
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
				<button class="btn btn-defualt"> Make Beautifull </button>
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
</body>
</html>
