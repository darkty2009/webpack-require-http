module.exports = function(request, id) {
    return "\
        promise = new Promise(function(resolve, reject) {\
            var script = document.createElement('script');\
            script.src = '"+request+"';\
            script.id = '"+id+"';\
            script.async = false;\
            (document.head || document.body).appendChild(script);\
            script.onload = function() {\
                resolve();\
            };\
            script.onerror = function() {\
                reject();\
            };\
        });\
    ";
};