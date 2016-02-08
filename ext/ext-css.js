module.exports = function(request, id) {
    return "\
        var link = document.createElement('link');\
        link.type = 'text/css';\
        link.rel = 'stylesheet';\
        link.href = '"+request+"';\
        link.id = '"+id+"';\
        (document.head || document.body).appendChild(link);\
    ";
};