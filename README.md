# var_dump

var_dumps --> var_masterpieces!
[philipreasa.github.io/var_dump](http://philipreasa.github.io/var_dump/)

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

- 1.1.2 -> updated manifest description.
- 1.1.3 -> Hacky fix for issue caused by `\n` in strings
- 1.2.0 -> rewrote parser to use formal grammar + PEGjs
- 1.3.0 -> updated grammar. Added elegant error handling
- 1.3.1 -> fixed a small CSS issue
- 1.3.2 -> improved support of float types
- 1.3.3 -> updated grammar to support references and resources
- 1.3.4 -> made manual selections more intelligent/forgiving
- 1.3.5 -> Object keys now more robust. fixed bug with 1.3.4 release
- 1.3.6 -> Fixed issue with scoped object keys
- 1.4.0 -> UI improvements, new header style, full-screen mode, settings link,
  Under the hood revamp (ES6, Linter, Smaller API footprint)
- 1.4.1 -> Grammar update (chained property names)
- 1.4.2 -> z-index increase to make the modal more likely to be on top
- 1.4.3 -> fixed issue with scroll bars always showing
- 1.4.4 -> revert bad fix that broke scrolling
- 1.5.0 -> added handling for multiple var_dumps at once
- 1.6.0 -> added ability to donate
- 1.6.1 -> hacky fix for purchase callback not working
- 1.6.2 -> removed ability to donate... it wasn't super popular XD
- 1.6.3 -> fixed bug with multiple var dumps and objects. Also added small enhancement to strings.
- 1.6.4 -> Lost track of branches. Fixing previous release.
- 1.6.5 -> Fixed visual bug. Thanks @spajak
- 1.6.6 -> Added styles for recursive and undefined case. Thanks @namvarii
- 1.6.7 -> minor cleanup
- 1.6.8 -> Manifest v3 Update
- 1.6.9 -> tech debt paydown
- 1.6.10 -> Removed log lines that slipped in

### OLD

version.major.feature.bug

- 1.0.0.# -> bug fixes
- 1.0.1.0 -> added statistics, some options
- 1.0.2.0 -> upgraded options page appearance, new icon
- 1.1.0.0 -> re-wrote a significant portion of code. Better html structure. Slightly better visuals. Removed statistics.
- 1.1.0.# -> small fixes caused by significant rewrite
- 1.1.0.5 -> Removed font awesome dependency to fix bug reported on chrome web store
