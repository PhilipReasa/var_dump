<?php
class foo
{
    var $ExtensionName = "Var_Masterpiece";
    var $AuthorName = "Philip Reasa";
    var $ExtensionAbilities = array("Tree Nesting Structure", "Custimizable Data Type Coloring",
        "Colapse/Expand", "Automatically Run", "Run Within A Page");
    var $GitHub = "Contribute here: <a href=\"https://github.com/PhilipReasa/var_dump\">https://github.com/Rece/var_dump</a>";
    var $TestAssociativeArrays = array("testing" => "It works!");
    var $TestBooleans = true;
    var $TestInts = 1;
    var $TestFloats = 1.004;
    var $TestNulls = NULL;
}

$test2 = new foo;
var_dump($test2);
