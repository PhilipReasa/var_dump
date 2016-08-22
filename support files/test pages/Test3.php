<?php
$test3 = [
    "key 1" => "value1",
    "key 2" => "string with \"quote\" and new lines \n testing...",
    "value3",
    "key 4" => "value4",
    "5 lets get tough" => "\"\n\n\"\"\"\nthere should be something here",
    "6 empty string" => "",
    "7 single new line" => "\n",
    "8 single quote" => "\"",
    "9 new line + single space" => "\n ",
    "key 10" => "I hope all of this works"
];
var_dump($test3);