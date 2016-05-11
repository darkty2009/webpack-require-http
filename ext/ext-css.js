module.exports = function(request, id) {
    return "\
        promise = new Promise(function(resolve, reject) {\
            var link = document.createElement('link');\
            link.type = 'text/css';\
            link.rel = 'stylesheet';\
            link.href = '"+request+"';\
            link.id = '"+id+"';\
            (document.head || document.body).appendChild(link);\
\
            link.onload = function() {\
                resolve();\
            };\
            link.onerror = function() {\
                reject();\
            };\
        });\
    ";
};