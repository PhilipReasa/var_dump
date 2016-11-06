<?php
$test4 = [
    "value has html" => "<a href='#'>link</a>",
    "<a href='#'>key</a>" => "key has html",
];
var_dump($test4);