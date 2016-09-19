module.exports = function(request, id) {
    return "\
        var fun=function(resolve, reject){\
            var link = document.createElement('link');\
            link.type = 'text/css';\
            link.rel = 'stylesheet';\
            link.href = '"+request+"';\
            link.id = '"+id+"';\
            (document.head || document.body).appendChild(link);\
            link.onload = function() {\
                typeof resolve=='function' && resolve();\
            };\
            link.onerror = function() {\
                typeof reject=='function' && reject();\
            };\
        };\
        if(JQ){\
            fun(resolve, reject);\
        }else{\
            promise = new Promise(function(resolve, reject) {\
                fun(resolve, reject);\
            });\
        }\
    ";
};