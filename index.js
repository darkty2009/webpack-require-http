var url = require('url');

var protocols = [
    'http:',
    'https:',
    'ftp:',
    'ftps:',
    'ws:'
];
var extMap = {
    'js':require('./ext/ext-js'),
    'css':require('./ext/ext-css')
};

var evalFunction = function(content) {
    return "(function() { "+content+"})()";
};

var existFunction = function(content, id) {
    return "\
        var promise = null;\
        var JQ='undefined'!=typeof jQuery;\
        var dfd = JQ && jQuery.Deferred();\
        var resolve = JQ && dfd.resolve;\
        var reject = JQ && dfd.reject;\
        if(document.getElementById('"+id+"')) {\
            if(JQ){\
                resolve();\
            }else{\
                promise = new Promise(function(resolve, reject) {\
                    resolve();\
                });\
            }\
        }\
        "+content+"\
\
        return JQ ? dfd.promise() : Promise.all([promise]);\
    ";
};

var getExtContent = function(pathname, request, options) {
    var ext = pathname.split('.').pop();
    if(options && options.ext) {
        ext = options.ext(pathname, request);
    }
    if(!extMap[ext]) {
        ext = 'js';
    }
    var id = require('md5')(request);
    return evalFunction(existFunction(extMap[ext].call(null, request, id), id));
};

var defaultExports = function(context, request, callback, options) {
    var rules = options ? options.rules : null;
    if(request && rules) {
        if(typeof rules == 'function') {
            request = rules.call(null, context, request);
        }
        if(typeof rules == 'object') {
            Object.keys(rules).forEach(function(rule, index) {
                request = request.replace(new RegExp(rule, 'ig'), rules[rule]);
            });
        }
    }

    if(request && request.indexOf('>') == 0) {
        request = request.substring(1);
        return callback(null, getExtContent(request, request, options));
    }else {
        var result = url.parse(request);
        if(protocols.indexOf(result.protocol) > -1) {
            var pathname = result.pathname || "";
            var content = getExtContent(pathname, request, options);
            return callback(null, content);
        }
    }

    return callback();
};

defaultExports.custom = function(option) {
    return function() {
        return defaultExports.apply(null, Array.prototype.slice.call(arguments).concat(option));
    };
};

module.exports = defaultExports;
