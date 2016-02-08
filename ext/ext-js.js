module.exports = function(request, id) {
    return "\
        var script = document.createElement('script');\
        script.src = '"+request+"';\
        script.id = '"+id+"';\
        script.async = false;\
        (document.head || document.body).appendChild(script);\
    ";
};