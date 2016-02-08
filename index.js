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
        if(document.getElementById('" + id + "')) {\
            return false;\
        }\
        " + content + "\
    ";
};

var getExtContent = function(pathname, request) {
    var ext = pathname.split('.').pop();
    if(!extMap[ext]) {
        ext = 'js';
    }
    var id = require('md5');
    return evalFunction(existFunction(extMap[ext].call(null, request, id), id));
};

module.exports = function(context, request, callback) {
    var result = url.parse(request);
    if(result.protocol == 'http:' || request.protocol == 'https:') {
        var pathname = result.pathname || "";
        var content = getExtContent(pathname, request);
        console.log(content);
        return callback(null, content);
    }

    return callback();
};