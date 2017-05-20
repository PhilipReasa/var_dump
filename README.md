# var_dump

var_dumps --> var_masterpieces!
[rece.github.io/var_dump](http://rece.github.io/var_dump/)

![sample](https://cloud.githubusercontent.com/assets/1691316/20464548/aca2261e-aefd-11e6-8f81-0abba3357a03.gif)

## What is var_dump

var_dump is a work-in-progress chrome extension that will parse a var_dump out of the DOM and make it pretty!
Also, Just FYI, we are now over on the chrome store: [Here!](https://chrome.google.com/webstore/detail/varmasterpiece/chfhddogiigmfpkcmgfpolalagdcamkl).

## Here's The Deal

Trying to read var_dumps is a lot like trying to read multiple lines of text without punctuation that wraps in a big block and makes you want to cry.

Actually, that is exactly what is it.

So here is a simple solution to this problem. Hope it works for you!

## Versioning

### NEW
[semver](http://semver.org/): MAJOR.MINOR.PATCH

* 1.1.2 -> updated manifest description.
* 1.1.3 -> Hacky fix for issue caused by `\n` in strings
* 1.2.0 -> rewrote parser to use formal grammar + PEGjs
* 1.3.0 -> updated grammar. Added elegant error handling
* 1.3.1 -> fixed a small CSS issue
* 1.3.2 -> improved support of float types
* 1.3.3 -> updated grammar to support references and resources
* 1.3.4 -> made manual selections more intelligent/forgiving

### OLD
version.major.feature.bug

* 1.0.0.# -> bug fixes
* 1.0.1.0 -> added statistics, some options
* 1.0.2.0 -> upgraded options page appearance, new icon
* 1.1.0.0 -> re-wrote a significant portion of code. Better html structure. Slightly better visuals. Removed statistics.
* 1.1.0.# -> small fixes caused by significant rewrite
* 1.1.0.5 -> Removed font awesome dependency to fix bug reported on chrome web store


