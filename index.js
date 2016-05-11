var url = require('url');

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
        if(document.getElementById('"+id+"')) {\
            promise = new Promise(function(resolve, reject) {\
                resolve();\
            });\
        }\
        "+content+"\
\
        return Promise.all([promise]);\
    ";
};

var getExtContent = function(pathname, request) {
    var ext = pathname.split('.').pop();
    if(!extMap[ext]) {
        ext = 'js';
    }
    var id = require('md5')(request);
    return evalFunction(existFunction(extMap[ext].call(null, request, id), id));
};

module.exports = function(context, request, callback) {
    var result = url.parse(request);
    if(result.protocol == 'http:' || request.protocol == 'https:') {
        var pathname = result.pathname || "";
        var content = getExtContent(pathname, request);
        return callback(null, content);
    }

    return callback();
};