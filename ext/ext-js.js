module.exports = function(request, id) {
    return "\
            var fun=function(resolve, reject){\
                var script = document.createElement('script');\
                script.src = '"+request+"';\
                script.id = '"+id+"';\
                script.async = false;\
                (document.head || document.body).appendChild(script);\
                script.onload = function() {\
                    typeof resolve=='function' && resolve();\
                };\
                script.onerror = function() {\
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