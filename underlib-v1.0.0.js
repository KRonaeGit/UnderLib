
// OpenSource UnderLib. Made by KRonaeGit(Github)

/**
 * @typedef {Object} UnderLib
 * @property {function(...param)} new
 * @property {function(...param)} do
 * 
 * @param  {...any} param 
 */
const UnderLib = function UnderLib(...param) {
    if(this instanceof UnderLib) {
        return UnderLib.get().new(param);
    }
    return UnderLib.get().do(param);
};
/**
 * Check is it NodeJS environment.
 * @returns {boolean} Is environment NodeJS
 */
UnderLib.isNodeJS = function() {
    try {
        return !(document != undefined && document != null);
    } catch(e) {
        return true;
    }
}
/**
 * Get nodejs underlib or js underlib automatically.
 * @returns {UnderLib.NodeJS | UnderLib.JS} Underlib
 */
UnderLib.get = function() {
    return UnderLib.isNodeJS() ? UnderLib.nodejs : UnderLib.js;
}
/**
 * @typedef {Object} UnderLib.NodeJS.Server.Req
 * // TODO : Received req
 * 
 * @typedef {Object} UnderLib.NodeJS.Server.Opt
 * @property {BigInteger} port
 * @property {(req : UnderLib.NodeJS.Server.Req) => undefined} connect
 * 
 * @typedef {Object} UnderLib.NodeJS.Client.Res
 * // TODO : Server res
 * 
 * @typedef {Object} UnderLib.NodeJS.Client.Opt
 * @property {String} address
 * @property {BigInteger} port
 * @property {String} path
 * @property {String} method
 * @property {String} data
 * @property {(res : UnderLib.NodeJS.Client.Res) => undefined} connect
 * 
 * @typedef {UnderLib} UnderLib.NodeJS
 * @property {(option : UnderLib.NodeJS.Client.Opt) => Promise<UnderLib.NodeJS.Client.Res>} do Send HTTP request.
 * @property {(option : UnderLib.NodeJS.Server.Opt) => UnderLib.NodeJS.Server} new Create new HTTP server.
 */
UnderLib.nodejs = {};
/**
 * Send HTTP request.
 * @param {UnderLib.NodeJS.Client.Opt} option
 * @returns {Promise<UnderLib.NodeJS.Client.Res>}
 */
UnderLib.nodejs.do = (option) => {
    // TODO : HTTP Client
};
/**
 * Create new HTTP server.
 * @param {UnderLib.NodeJS.Server.Opt} option
 * @returns {UnderLib.NodeJS.Server}
 */
UnderLib.nodejs.new = (option) => {
    // TODO : HTTP Server
};
/**
 * @typedef {String | Array<String> | Element} UnderLib.JS.Do.Opt
 * @typedef {Object} UnderLib.JS.Element
 * @typedef {Array<UnderLib.JS.Element>} UnderLib.JS.Elements
 * @typedef {UnderLib.JS.Element | UnderLib.JS.Elements} UnderLib.JS.ElementIdk
 * 
 * @typedef {UnderLib} UnderLib.NodeJS
 * @property {(selectors : UnderLib.JS.Do.Opt) => UnderLib.JS.ElementIdk} do Get element by selector(s)
 * @property {(tagname : String, id : String?) => UnderLib.JS.Element} new Create element by tagname and id.
 */
UnderLib.js = {};
/**
 * Get element by selector(s).
 * @param {UnderLib.JS.Do.Opt} selectors
 * @param {boolean?} arreturn
 * @returns {UnderLib.Element}
 */
UnderLib.js.do = (selectors, arreturn) => {
    var elements = [];
    arreturn = arreturn == undefined ? false : arreturn;
    if(selectors instanceof Array) {
        for (let i = 0; i < selectors.length; i++) {
            if(typeof(selectors[i]) == "string") {
                var e = document.querySelectorAll(selectors[i]);
                for (let j = 0; j < e.length; j++) {
                    elements.push(e[j]);
                }
            } else {
                elements.push(selectors[i]);
            }
        }
    } else if (typeof(selectors) == "string") {
        elements = document.querySelectorAll(selectors);
    } else {
        elements = [ selectors ];
    }
    if(elements.length == 0) {
        return null;
    } else if(elements.length == 1 && !arreturn) {
        return  UnderLib.js.do.parse([elements[0]], arreturn);
    }
    return UnderLib.js.do.parse(elements, arreturn);
};
const UnderLibElement = function (targets) {
    return {targets};
}
/**
 * @typedef {Element} UnderLib.Element
 * @property {boolean} arreturn
 * 
 * @param {Array<Element>} targets
 * @param {boolean} arreturn
 * @returns {UnderLib.Element}
 */
UnderLib.js.do.parse = (targets, arreturn) => {
    data = new UnderLibElement(targets);
    
    var doc = null;
    for (let i = 0; i < targets.length; i++) {
        if(targets[i] instanceof Document) {
            doc = targets[i];
            break;
        }
    }
    if(doc != null) {
        data.ready = (handler) => {
            return new Promise((res, rej) => {
                if(doc.readyState == 'complete') {
                    if(typeof(handler)!="undefined") handler();
                    return res();
                }

                doc.addEventListener("DOMContentLoaded", () => {
                    if(typeof(handler)!="undefined") handler();
                    res();
                });
            });
        }
    }

    data.move = (x, y) => {
        targets.forEach(element => {
            element.style.transform = "translate(" + x + "px, " + y + "px)";
        });
        return data;
    };
    data.opacity = (value) => {
        if(value == undefined) { 
            var result = [];
            targets.forEach(element => {
                var opacity = UnderLib.util.opacity(element);
                result.push(opacity);
            });
            if(arreturn) {
                return result;
            }
            return UnderLib.util.average(data.opacity());
        }
        if(UnderLib.js.option.opacity.rangeLimit)
            value = Math.max(0, Math.min(1, value));
        if(UnderLib.js.option.opacity.safeRound != 0) {
            var sfr = 1 / UnderLib.js.option.opacity.safeRound;
            if(value < sfr) {
                value = 0;
            } else if(value > 1-sfr) {
                value = 1;
            }
        }
        if(UnderLib.js.option.opacity.safeMultiple != 0) {
            value = Math.round(value * UnderLib.js.option.opacity.safeMultiple) * UnderLib.js.option.opacity.safeMultiple
        }
        targets.forEach(element => {
            element.style.opacity = value;
        });
        return data;
    };
    data.fadeOut = (ms) => {
        var end = 0;
        targets.forEach(element => {
            var start = Date.now();
            var max = element.opacity();

            var intv;
            intv = setInterval(() => {
                if(element.opacity() == 0) {
                    clearInterval(intv);
                    end++;
                }
                var value = (1 - (Date.now() - start) / ms) * max;
                if(value < 0)
                    value = 0;
                element.opacity(value);
            }, 1);
        });
        return new Promise((res, rej) => {
            var intv;
            intv = setInterval(() => {
                if(end >= targets.length) {
                    clearInterval(intv);
                    res(data);
                }
            }, 1);
        });
    };
    data.fadeIn = (ms, target) => {
        target = target == undefined ? 1 : target;
        
        var end = 0;
        targets.forEach(element => {
            var start = Date.now();

            var intv;
            intv = setInterval(() => {
                if(element.opacity() >= target) {
                    clearInterval(intv);
                    end++;
                }
                var value = ((Date.now() - start) / ms) * target;
                if(value > target)
                    value = target;
                element.opacity(value);
            }, 1);
        });
        return new Promise((res, rej) => {
            var intv;
            intv = setInterval(() => {
                if(end >= targets.length) {
                    clearInterval(intv);
                    res(data);
                }
            }, 1);
        });
    };
    data.attribute = (key, value) => {
        if(value == undefined) {
            var result = [];
            targets.forEach(element => {
                result.push(element.getAttribute(key));
            });
            if(arreturn) {
                return result;
            }
            return result[0];
        }
        targets.forEach(element => {
            element.setAttribute(key, value);
        });
        return data;
    }
    data.attr = data.attribute;
    data.on = (event, listener, options) => {
        targets.forEach(element => {
            element.addEventListener(event, listener, options);
        });
        return data;
    }
    data.html = (value) => {
        if(value == undefined) {
            var result = [];
            targets.forEach(element => {
                result.push(element.innerHTML);
            });
            if(arreturn) {
                return result;
            }
            return result[0];
        }
        targets.forEach(element => {
            element.innerHTML = value;
        });
        return data;
    }
    data.text = (value) => {
        if(value == undefined) {
            var result = [];
            targets.forEach(element => {
                result.push(element.innerText);
            });
            if(arreturn) {
                return result;
            }
            return result[0];
        }
        targets.forEach(element => {
            element.innerText = value;
        });
        return data;
    }
    data.val = (value) => {
        if(value == undefined) {
            var result = [];
            targets.forEach(element => {
                if(element.tagName == "INPUT" && element.getAttribute("type") == "checkbox") {
                    result.push(element.checked);
                } else {
                    result.push(element.value);
                }
            });
            if(arreturn) {
                return result;
            }
            return result[0];
        }
        targets.forEach(element => {
            element.value = value;
        });
        return data;
    }
    data.css = (style, value) => {
        if(value == undefined) {
            if(typeof(style) != "string") {
                var keys = Object.keys(style);
                for(var i = 0; i < keys.length; i++) {
                    data.style[keys[i]] = style[keys[i]];
                }
                return data;
            }
            var result = [];
            targets.forEach(element => {
                result.push(element.style[style]);
            });
            if(arreturn) {
                return result;
            }
            return result[0];
        }
        targets.forEach(element => {
            element.style[style] = value;
        });
        return data;
    }
    data.add = (...toadd) => {
        toadd = UnderLib.js.do.raw(toadd);
        targets.forEach(element => {
            for(var i = 0; i < toadd.length; i++) {
                element.append(toadd[i]);
            }
        });
        return this;
    }
    return data;
};
UnderLib.js.do.raw = (elements) => {
    if(elements instanceof Array) {
        var result = [];
        for(var i = 0; i < elements.length; i++) {
            var toadd = UnderLib.js.do.raw(elements[i]);
            for(var j = 0; j < toadd.length; j++) {
                result.push(toadd[j]);
            }
        }
        return result;
    }
    return elements.targets == undefined ? elements : elements.targets;
}
/**
 * Create element by tagename and id.
 * @param {String} tagname
 * @param {String?} id
 */
UnderLib.js.new = (tagname, id) => {
    var element = document.createElement(tagname);
    if(id != undefined) element.id = id;
    return UnderLib.js.do(element);
};
UnderLib.util = {};
UnderLib.util.opacity = (element) => {
    return element.style.display.toLowerCase() == "none" ? 0 : (element.style.opacity == undefined || element.style.opacity == null || element.style.opacity == "" ? parseFloat(window.getComputedStyle(element).getPropertyValue("opacity")) : parseFloat(element.style.opacity))
}
UnderLib.util.average = (arr) => {
    if(arr instanceof Array) {
        if(arr.length == 0)
            return 0;

        var sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum/arr.length;
    }
    return arr;
}
UnderLib.js.option = {
    "opacity": {
        "rangeLimit": true, // Limit to 0~1
        "safeMultiple": 0, // Quality of opacity. If it is 256, The value will be multiple of 1/256. If you want to turn of this option, set value to 0.
        "safeRound": 256 // If opacity is lower than 1/256, It will be 0. If you want to turn of this option, set value to 0.
    }
};
UnderLib.option = UnderLib.isNodeJS() ? UnderLib.nodejs.option : UnderLib.js.option;

const _ = UnderLib;