module.exports = function(request) {
    return "\
        var link = document.createElement('link');\
        link.type = 'text/css';\
        link.ref = 'stylesheet';\
        link.href = '"+request+"';\
        document.body.appendChild(link);\
    ";
};