# UnderLib(JavaScript)
All the functions of UnderLib are in `_` or `UnderLib`.

When using UnderLib in JavaScript, you can use it like this:
```javascript
_(document).ready(async() => { // `async` to use `await`
    var element = _("#text");
    await element.fadeIn(1000);
    await element.fadeOut(1000);
});
```
The above code will gently fade in `#text` (the element with `id="text"`) for 1000 seconds and then fade out for 1000 seconds.

