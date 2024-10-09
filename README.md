# UnderLib
The best library for **(JavaScript)[/UnderLibJS.md]** / **(Node.JS)[/UnderLibNodeJS.md]** developers.

If you are a JavaScript developer? Then try UnderLib, a library similar to jQuery!

If you are a Node.JS developer? Then send HTTP server and AJAX requests!

I combined these two simple functions into **ONLY ONE CODE**!

### How can I use different features in different languages?
The grammar of JavaScript and Node.JS is almost the same, and the only difference is the execution environment.
Isn't this the first time you've seen libraries that assign different functions to each language? The principle is very simple.
You can distinguish between JavaScript and Node.JS.
It's whether there is a constant called 'document' or not.

```javascript
UnderLib.isNodeJS = function() {
    try {
        return !(document != undefined && document != null);
    } catch(e) {
        return true;
    }
}
```
