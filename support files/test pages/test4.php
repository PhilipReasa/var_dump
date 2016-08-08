<?php
$a = [
    "value has html" => "<a href='#'>link</a>",
    "<a href='#'>key</a>" => "hey has html",
];
var_dump($a);