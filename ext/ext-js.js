module.exports = function(request) {
    return "\
        var script = document.createElement('script');\
        script.src = '"+request+"';\
        document.body.appendChild(script);\
    ";
};