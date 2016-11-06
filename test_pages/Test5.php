<?php
$test5 = [
    "first line new line (should not be empty)" => "\nNot empty!",
    "Key has new \n line" => "Key should be: \"Key has new line\"",
    "last line has new line (should not be empty)" => "\nNot empty!"
];
var_dump($test5);