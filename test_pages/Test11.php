<?php
$string = "test string";
$test11 = array($string, &$string);

var_dump($test11);
