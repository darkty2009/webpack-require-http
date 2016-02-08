module.exports = function(request, id) {
    return "\
        var script = document.createElement('script');\
        script.src = '"+request+"';\
        script.id = '"+id+"';\
        (document.head || document.body).appendChild(script);\
    ";
};