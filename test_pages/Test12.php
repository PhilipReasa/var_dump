<?php
class foo {
    public $normalString = "normal string (no references)";
    public $normalInt = 1;
    public $normalFloat = 1.01;
    public $normalBool = false;
    public $normalArray = array();
    public $normalObject;

    public $string = "test string";
    public $stringReference;

    public $int = 1;
    public $intReference;

    public $float = 1.01;
    public $floatReference;

    public $bool = false;
    public $boolReference;

    public $array = [];
    public $arrayReference;

    public $object;
    public $objectReference;

    function __construct() {
        $this->normalObject = new stdClass();
        $this->object = new stdClass();

        $this->stringReference = &$this->string;
        $this->intReference = &$this->int;
        $this->floatReference = &$this->float;
        $this->boolReference = &$this->bool;
        $this->arrayReference = &$this->array;
        $this->objectReference = &$this->object;
    }
}

$test12 = new foo();
var_dump($test12);
