var webpackRequireHttp = require('../index');

webpackRequireHttp('', 'http://5doe.com/custom/website.js', function(err, content) {
    console.log('TEST1', content);
});

webpackRequireHttp('', 'ftp://5doe.com/custom/website.js', function(err, content) {
    console.log('TEST1', content);
});

webpackRequireHttp('', 'ws://5doe.com/custom/iosocket.js', function(err, content) {
    console.log('TEST1', content);
});

var custom3Function = webpackRequireHttp.custom({
    rules:{
        'somethingelse':'something'
    }
});

custom3Function('', '#api/system', function(err, content) {
    console.log('TEST4', content);
});

var custom1Function = webpackRequireHttp.custom({
    rules:{
        '^#(.+)\/(.+)':'http://static.something.com/$1/$2.js'
    }
});

custom1Function('', '#api/sdk', function(err, content) {
    console.log('TEST2', content);
});

custom3Function('', '#api/system', function(err, content) {
    console.log('TEST4', content);
});

var custom2Function = webpackRequireHttp.custom({
    rules:function(context, request) {
        if(request && request.indexOf('//') == 0) {
            return 'http:' + request;
        }
        return request;
    }
});

custom2Function('', '//something.com/index.js', function(err, content) {
    console.log('TEST3', content);
});

webpackRequireHttp('', '>/direct/to/path.js', function(err, content) {
    console.log('TEST9', content);
});
