<?php
class foo
{
    var $ExtensionName = "Var_Masterpiece";
    var $AuthorName = "Philip Reasa";
    var $ExtensionAbilities = array("Tree Nesting Structure", "Customizable Data Type Coloring",
        "Collapse/Expand", "Automatically Run", "Run Within A Page");
    var $GitHub = "Contribute here: https://github.com/PhilipReasa/var_dump";
    var $TestAssociativeArrays = array("testing" => "It works!");
    var $TestBooleans = true;
    var $TestInts = 1;
    var $TestFloats = 1.004;
    var $TestNulls = NULL;
    private $Private = true;
}

$test1 = new foo;
var_dump($test1);
